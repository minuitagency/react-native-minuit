import React, { useEffect, useMemo, useState } from 'react';
import { useGlobal } from 'reactn';
import useDataFromRef from './useDataFromRef';
import _ from 'lodash';

function sortUsers(users) {
  return users.sort((a, b) => a.localeCompare(b));
}

function snapShotToData(snap) {
  return {
    id: snap.id,
    ...snap.data(),
  };
}

export default function useGroupChat({
  firestore, // firestore instance for arrayUninon and firestoreTimestamp
  usersToChat = [], // require if chat not exists
  conversationId = null, // require
  conversationRef, // require
  formatConversation = (data) => data,
  formatMessages = (data) => data,
  messagesPerBatch = 20,
  senderData = {}, // use this for name or picture
}) {
  const DEFAULT_MSG_TYPE = 'MESSAGE';
  const [uid] = useGlobal('uid'); // required for sending messages
  const [, setGlobalLoading] = useGlobal('_isLoading');
  const [convId, setConvId] = useState(conversationId);
  const [newDocSnap, setNewDocSnap] = useState(null);
  const [changeDocSnap, setChangeDocSnap] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [pendingMsg, setPendingMsg] = useState(null);

  const messageRef = useMemo(
    () => (convId ? conversationRef.doc(convId).collection('messages') : null),
    [convId]
  );

  useEffect(() => {
    if (messageRef && pendingMsg) {
      sendMessage(pendingMsg).then(() => setPendingMsg(null));
    }
  }, [messageRef, pendingMsg]);

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

  useEffect(() => {
    let messageSub = null;
    if (messageRef) {
      messageSub = messageRef
        .orderBy('lastUpdate', 'desc')
        .limit(1)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
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

  async function onNewMessageReceived(data) {
    const { lastMessage, unreadMsg = [] } = data;
    const newConvData = {};
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
      await conversationRef.doc(convId).update(newConvData);
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
    let msgSubscriber = null;
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
      setPendingMsg({ message, type, moreData });
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

  async function updateMessage(messageId, data) {
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

  async function deleteMessage(messageId) {
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
  };
}
