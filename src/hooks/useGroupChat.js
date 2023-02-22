import React, { useEffect, useMemo, useState } from 'react';
import { useGlobal } from 'reactn';
import useDataFromRef from './useDataFromRef';

function sortUsers(users) {
  return users.sort((a, b) => a.localeCompare(b));
}

export default function useGroupChat({
  firestore, // firestore instance for arrayUninon and firestoreTimestamp
  usersToChat = [], // require if chat not exists
  conversationId = null, // require
  conversationRef, // require
  formatConversation = (data) => data,
  formatMessages = (data) => data,
  messagesPerBatch = 20,
  senderData = {}, // user this for name or picture
}) {
  const DEFAULT_MSG_TYPE = 'MESSAGE';
  const [uid] = useGlobal('uid'); // required for sending messages
  const [, setGlobalLoading] = useGlobal('_isLoading');
  const [convId, setConvId] = useState(conversationId);
  const [newDocSnap, setNewDocSnap] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const messageRef = useMemo(
    () => (convId ? conversationRef.doc(convId).collection('messages') : null),
    [convId]
  );

  useDataFromRef({
    ref: convId && conversationRef.doc(convId),
    initialState: null,
    simpleRef: true,
    listener: true,
    onUpdate: (data) => onNewMessageReceived(data),
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

  async function onNewMessageReceived(data) {
    const { lastMessage } = data;
    const isLastMessageUnread = !lastMessage?.readBy?.includes(uid);
    if (isLastMessageUnread) {
      await conversationRef.doc(convId).update({
        readBy: firestore.FieldValue.arrayUnion(uid),
      });
    }
  }

  useEffect(() => {
    if (newDocSnap && messages.length > 0) {
      const includeInCon = messages.some((doc) => doc.id === newDocSnap.id);
      if (!includeInCon) {
        const newMsg = {
          id: newDocSnap.id,
          ...newDocSnap.data(),
        };
        setMessages((prev) => [newMsg, ...prev]);
      }
      setNewDocSnap(null);
    }
  }, [newDocSnap]);

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
    let msgSubscriber = null;
    if (convId) {
      msgSubscriber = messageRef
        .orderBy('time', 'desc')
        .limit(1)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
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

  async function sendMsg({ message, type = DEFAULT_MSG_TYPE, moreData = {} }) {
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
  }) {
    try {
      const { id } = await conversationRef.add({
        createdBy: uid,
        createdAt: firestore.Timestamp.now(),
        lastUpdate: firestore.Timestamp.now(),
        users: sortUsers([...usersToChat, uid]),
        readBy: [uid],
        lastMessage: {
          content: message,
          sender: uid,
          senderData,
        },
      });
      setConvId(id);
      await sendMsg({ message, type, moreData });
    } catch (e) {
      console.log(e);
    }
  }

  async function sendMessage({
    message,
    type = DEFAULT_MSG_TYPE,
    moreData = {},
  }) {
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

  return {
    sendMessage,
    msgLoading: convId === null ? false : loading,
    getMoreMsg: loadMore,
    messages,
  };
}
