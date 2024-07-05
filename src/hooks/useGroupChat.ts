import React, { useEffect, useMemo, useState } from 'react';
import { useGlobal } from 'reactn';
import useDataFromRef from './useDataFromRef';
import _ from 'lodash';
import { firestore } from 'firebase';

type FirestoreInstance = typeof firestore;
type FirestoreTimestamp = firestore.Timestamp;
type FirestoreFieldValue = firestore.FieldValue;

interface SenderData {
  name?: string;
  picture?: string;
  [key: string]: any;
}

interface InitialConvData {
  [key: string]: any;
}

interface UseGroupChatProps {
  firestore: FirestoreInstance;
  usersToChat?: string[];
  conversationId?: string | null;
  conversationRef: firestore.CollectionReference;
  formatConversation?: (data: any) => any;
  formatMessages?: (data: any) => any;
  messagesPerBatch?: number;
  senderData?: SenderData;
  initialConvData?: InitialConvData;
}

interface MessageData {
  content: string;
  type: string;
  time: FirestoreTimestamp;
  sender: string;
  senderData: SenderData;
  [key: string]: any;
}

interface ConversationData {
  lastMessage?: MessageData;
  unreadMsg?: { userId: string; count: number }[];
  readBy?: string[];
  [key: string]: any;
}

function sortUsers(users: string[]): string[] {
  return users.sort((a, b) => a.localeCompare(b));
}

function snapShotToData(snap: firestore.DocumentSnapshot): any {
  return {
    id: snap.id,
    ...snap.data(),
  };
}

export default function useGroupChat({
  firestore,
  usersToChat = [],
  conversationId = null,
  conversationRef,
  formatConversation = (data) => data,
  formatMessages = (data) => data,
  messagesPerBatch = 20,
  senderData = {},
  initialConvData = {},
}: UseGroupChatProps) {
  const DEFAULT_MSG_TYPE = 'MESSAGE';
  const [uid] = useGlobal<string>('uid'); // required for sending messages
  const [, setGlobalLoading] = useGlobal<boolean>('_isLoading');
  const [convId, setConvId] = useState<string | null>(conversationId);
  const [newDocSnap, setNewDocSnap] = useState<firestore.DocumentSnapshot | null>(null);
  const [changeDocSnap, setChangeDocSnap] = useState<firestore.DocumentSnapshot | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pendingMsg, setPendingMsg] = useState<MessageData | null>(null);

  const messageRef = useMemo(
    () => (convId ? conversationRef.doc(convId).collection('messages') : null),
    [convId]
  );

  useEffect(() => {
    if (messageRef && pendingMsg) {
      sendMessage(pendingMsg).then(() => setPendingMsg(null));
    }
  }, [messageRef, pendingMsg]);

  const { data: convData } = useDataFromRef({
    ref: convId && conversationRef.doc(convId),
    initialState: null,
    simpleRef: true,
    listener: true,
    onUpdate: (data: any) => onNewMessageReceived(data),
    condition: !!convId,
    format: formatConversation,
  });

  const {
    data: messages,
    setData: setMessages,
    loading,
    loadMore,
  } = useDataFromRef({
    ref: messageRef && messageRef.orderBy('time', 'desc'),
    initialState: [],
    simpleRef: false,
    listener: false,
    usePagination: true,
    batchSize: messagesPerBatch,
    condition: !!messageRef,
    refreshArray: [refresh],
    format: formatMessages,
  });

  useEffect(() => {
    let messageSub: (() => void) | null = null;
    if (messageRef) {
      messageSub = messageRef
        .orderBy('lastUpdate', 'desc')
        .limit(1)
        .onSnapshot((snapshot) => {
          snapshot?.docChanges()?.forEach((change) => {
            if (['added', 'modified'].includes(change.type)) {
              setChangeDocSnap(change.doc);
            }
          });
        });
    }

    return () => {
      if (messageSub) {
        messageSub();
      }
    };
  }, [messageRef]);

  async function onNewMessageReceived(data: ConversationData) {
    const { lastMessage, unreadMsg = [] } = data;
    const newConvData: Partial<ConversationData> = {};
    const userFind = unreadMsg.find((u) => u.userId === uid);
    if (userFind && userFind.count > 0) {
      for (let i = 0; i < unreadMsg.length; i++) {
        if (unreadMsg[i].userId === uid) {
          unreadMsg[i].count = 0;
        }
      }
      newConvData.unreadMsg = unreadMsg;
    }
    if (!lastMessage?.readBy?.includes(uid)) {
      newConvData.readBy = firestore.FieldValue.arrayUnion(uid);
    }
    if (_.size(newConvData) > 0) {
      await conversationRef.doc(convId!).update(newConvData);
    }
  }

  useEffect(() => {
    if (newDocSnap && messages.length > 0) {
      const msgIdx = messages.findIndex((doc) => doc.id === newDocSnap.id);
      const newMsg = formatMessages(snapShotToData(newDocSnap));
      if (msgIdx === -1) {
        setMessages((prev) => [newMsg, ...prev]);
      }
      setNewDocSnap(null);
    }
  }, [newDocSnap]);

  useEffect(() => {
    if (changeDocSnap && messages.length > 0) {
      const msgIdx = messages.findIndex((doc) => doc.id === changeDocSnap.id);
      const newMsg = formatMessages(snapShotToData(changeDocSnap));
      if (msgIdx === -1) {
        console.log('Not found');
      } else {
        const newMessages = [...messages];
        newMessages[msgIdx] = newMsg;
        setMessages(newMessages);
      }
      setChangeDocSnap(null);
    }
  }, [changeDocSnap]);

  useEffect(() => {
    if (!convId) {
      setGlobalLoading(true).then(() => {
        conversationRef
          .where('users', '==', sortUsers([...usersToChat, uid]))
          .get()
          .then(
            ({ docs }) => {
              if (docs?.length > 0) {
                setConvId(docs[0].id);
              }
            },
            (e) => console.log(e)
          )
          .catch((e) => console.log(e))
          .finally(() => setGlobalLoading(false));
      });
    }
  }, []);

  useEffect(() => {
    let msgSubscriber: (() => void) | null = null;
    if (convId) {
      msgSubscriber = messageRef
        .orderBy('time', 'desc')
        .limit(1)
        .onSnapshot((snapshot) => {
          snapshot?.docChanges()?.forEach((change) => {
            if (change.type === 'added') {
              setNewDocSnap(change.doc);
            }
          });
        });
    }
    return () => {
      if (msgSubscriber) {
        msgSubscriber();
      }
    };
  }, [convId, refresh]);

  async function sendMsg({ message, type = DEFAULT_MSG_TYPE, moreData = {} }: MessageData) {
    try {
      await messageRef.add({
        content: message,
        type,
        time: firestore.Timestamp.now(),
        sender: uid,
        senderData,
        ...moreData,
      });
      if (messages?.length === 0) {
        setRefresh(!refresh);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function createNewConversation({
    message,
    type = DEFAULT_MSG_TYPE,
    moreData = {},
  }: MessageData) {
    try {
      const { id } = await conversationRef.add({
        createdBy: uid,
        createdAt: firestore.Timestamp.now(),
        lastUpdate: firestore.Timestamp.now(),
        users: sortUsers([...usersToChat, uid]),
        readBy: [uid],
        ...initialConvData,
        lastMessage: {
          content: message,
          sender: uid,
          senderData,
        },
      });
      setConvId(id);
      setPendingMsg({ message, type, moreData });
    } catch (e) {
      console.log(e);
    }
  }

  async function sendMessage({
    message,
    type = DEFAULT_MSG_TYPE,
    moreData = {},
  }: MessageData) {
    try {
      if (!convId) {
        if (usersToChat?.length === 0) {
          throw new Error('You must chat with at least one user');
        }
        await createNewConversation({ message, type, moreData });
      } else {
        await sendMsg({ message, type, moreData });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function updateMessage(messageId: string, data: Partial<MessageData>) {
    try {
      await messageRef.doc(messageId).update(data);
      const updatedMsg = await messageRef.doc(messageId).get();
      const newMsg = await formatMessages(snapShotToData(updatedMsg));
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? newMsg : msg))
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteMessage(messageId: string) {
    try {
      await messageRef.doc(messageId).delete();
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (e) {
      console.log(e);
    }
  }

  return {
    sendMessage,
    updateMessage,
    deleteMessage,
    msgLoading: convId === null ? false : loading,
    getMoreMsg: loadMore,
    messages,
    convData,
  };
}
