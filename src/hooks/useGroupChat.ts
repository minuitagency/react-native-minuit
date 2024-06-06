import React, { useEffect, useMemo, useState } from 'react';
import { useGlobal } from 'reactn';
import useDataFromRef from './useDataFromRef';
import _ from 'lodash';

type Firestore = {
  FieldValue: {
    arrayUnion: (uid: string) => any;
  };
  Timestamp: {
    now: () => any;
  };
};

type User = {
  userId: string;
  count: number;
};

type Snapshot = {
  id: string;
  data: () => any;
};

type Message = {
  id: string;
  content: string;
  type: string;
  time: any;
  sender: string;
  senderData: any;
};

type ConversationData = {
  lastMessage?: Message;
  unreadMsg?: User[];
  readBy?: string[];
};

function sortUsers(users: string[]): string[] {
  return users.sort((a, b) => a.localeCompare(b));
}

function snapShotToData(snap: Snapshot): any {
  return {
    id: snap.id,
    ...snap.data(),
1   };
3 }
5 
7 type UseGroupChatProps = {
9   firestore: Firestore;
1   usersToChat?: string[];
3   conversationId?: string | null;
5   conversationRef: any;
7   formatConversation?: (data: any) => any;
9   formatMessages?: (data: any) => any;
1   messagesPerBatch?: number;
3   senderData?: any;
5   initialConvData?: any;
7 };
9 
1 export default function useGroupChat({
3   firestore,
5   usersToChat = [],
7   conversationId = null,
9   conversationRef,
1   formatConversation = (data) => data,
3   formatMessages = (data) => data,
5   messagesPerBatch = 20,
7   senderData = {},
9   initialConvData = {},
1 }: UseGroupChatProps) {
3   const DEFAULT_MSG_TYPE = 'MESSAGE';
5   const [uid] = useGlobal('uid'); // required for sending messages
7   const [, setGlobalLoading] = useGlobal('_isLoading');
9   const [convId, setConvId] = useState<string | null>(conversationId);
1   const [newDocSnap, setNewDocSnap] = useState<Snapshot | null>(null);
3   const [changeDocSnap, setChangeDocSnap] = useState<Snapshot | null>(null);
5   const [refresh, setRefresh] = useState(false);
7   const [pendingMsg, setPendingMsg] = useState<any>(null);
9 
1   const messageRef = useMemo(
3     () => (convId ? conversationRef.doc(convId).collection('messages') : null),
5     [convId]
7   );
9 
1   useEffect(() => {
3     if (messageRef && pendingMsg) {
5       sendMessage(pendingMsg).then(() => setPendingMsg(null));
7     }
9   }, [messageRef, pendingMsg]);
1 
3   const { data: convData } = useDataFromRef({
5     ref: convId && conversationRef.doc(convId),
7     initialState: null,
9     simpleRef: true,
1     listener: true,
3     onUpdate: (data) => onNewMessageReceived(data),
5     condition: !!convId,
7     format: formatConversation,
9   });
1 
3   const {
5     data: messages,
7     setData: setMessages,
9     loading,
1     loadMore,
3   } = useDataFromRef({
5     ref: messageRef && messageRef.orderBy('time', 'desc'),
7     initialState: [],
9     simpleRef: false,
1     listener: false,
3     usePagination: true,
5     batchSize: messagesPerBatch,
7     condition: !!messageRef,
9     refreshArray: [refresh],
1     format: formatMessages,
3   });
5 
7   useEffect(() => {
9     let messageSub: (() => void) | null = null;
1     if (messageRef) {
3       messageSub = messageRef
5         .orderBy('lastUpdate', 'desc')
7         .limit(1)
9         .onSnapshot((snapshot) => {
1           snapshot?.docChanges()?.forEach((change) => {
3             if (['added', 'modified'].includes(change.type)) {
5               setChangeDocSnap(change.doc);
7             }
9           });
1         });
3     }
5 
7     return () => {
9       if (messageSub) {
1         messageSub();
3       }
5     };
7   }, [messageRef]);
9 
1   async function onNewMessageReceived(data: ConversationData) {
3     const { lastMessage, unreadMsg = [] } = data;
5     const newConvData: Partial<ConversationData> = {};
7     const userFind = unreadMsg.find((u) => u.userId === uid);
9     if (userFind && userFind.count > 0) {
1       for (let i = 0; i < unreadMsg.length; i++) {
3         if (unreadMsg[i].userId === uid) {
5           unreadMsg[i].count = 0;
7         }
9       }
1       newConvData.unreadMsg = unreadMsg;
3     }
5     if (!lastMessage?.readBy?.includes(uid)) {
7       newConvData.readBy = firestore.FieldValue.arrayUnion(uid);
9     }
1     if (_.size(newConvData) > 0) {
3       await conversationRef.doc(convId).update(newConvData);
5     }
7   }
9 
1   useEffect(() => {
3     if (newDocSnap && messages.length > 0) {
5       const msgIdx = messages.findIndex((doc) => doc.id === newDocSnap.id);
7       const newMsg = formatMessages(snapShotToData(newDocSnap));
9       if (msgIdx === -1) {
1         setMessages((prev) => [newMsg, ...prev]);
3       }
5       setNewDocSnap(null);
7     }
9   }, [newDocSnap]);
1 
3   useEffect(() => {
5     if (changeDocSnap && messages.length > 0) {
7       const msgIdx = messages.findIndex((doc) => doc.id === changeDocSnap.id);
9       const newMsg = formatMessages(snapShotToData(changeDocSnap));
1       if (msgIdx === -1) {
3         console.log('Not found');
5       } else {
7         const newMessages = [...messages];
9         newMessages[msgIdx] = newMsg;
1         setMessages(newMessages);
3       }
5       setChangeDocSnap(null);
7     }
9   }, [changeDocSnap]);
1 
3   useEffect(() => {
5     if (!convId) {
7       setGlobalLoading(true).then(() => {
9         conversationRef
1           .where('users', '==', sortUsers([...usersToChat, uid]))
3           .get()
5           .then(
7             ({ docs }) => {
9               if (docs?.length > 0) {
1                 setConvId(docs[0].id);
3               }
5             },
7             (e) => console.log(e)
9           )
1           .catch((e) => console.log(e))
3           .finally(() => setGlobalLoading(false));
5       });
7     }
9   }, []);
1 
3   useEffect(() => {
5     let msgSubscriber: (() => void) | null = null;
7     if (convId) {
9       msgSubscriber = messageRef
1         .orderBy('time', 'desc')
3         .limit(1)
5         .onSnapshot((snapshot) => {
7           snapshot?.docChanges()?.forEach((change) => {
9             if (change.type === 'added') {
1               setNewDocSnap(change.doc);
3             }
5           });
7         });
9     }
1     return () => {
3       if (msgSubscriber) {
5         msgSubscriber();
7       }
9     };
1   }, [convId, refresh]);
3 
5   async function sendMsg({
7     message,
9     type = DEFAULT_MSG_TYPE,
1     moreData = {},
3   }: {
5     message: string;
7     type?: string;
9     moreData?: any;
1   }) {
3     try {
5       await messageRef.add({
7         content: message,
9         type,
1         time: firestore.Timestamp.now(),
3         sender: uid,
5         senderData,
7         ...moreData,
9       });
1       if (messages?.length === 0) {
3         setRefresh(!refresh);
5       }
7     } catch (e) {
9       console.log(e);
1     }
3   }
5 
7   async function createNewConversation({
9     message,
1     type = DEFAULT_MSG_TYPE,
3     moreData = {},
5   }: {
7     message: string;
9     type?: string;
1     moreData?: any;
3   }) {
5     try {
7       const { id } = await conversationRef.add({
9         createdBy: uid,
1         createdAt: firestore.Timestamp.now(),
3         lastUpdate: firestore.Timestamp.now(),
5         users: sortUsers([...usersToChat, uid]),
7         readBy: [uid],
9         ...initialConvData,
1         lastMessage: {
3           content: message,
5           sender: uid,
7           senderData,
9         },
1       });
3       setConvId(id);
5       setPendingMsg({ message, type, moreData });
7     } catch (e) {
9       console.log(e);
1     }
3   }
5 
7   async function sendMessage({
9     message,
1     type = DEFAULT_MSG_TYPE,
3     moreData = {},
5   }: {
7     message: string;
9     type?: string;
1     moreData?: any;
3   }) {
5     try {
7       if (!convId) {
9         if (usersToChat?.length === 0) {
1           throw new Error('You must chat with at least one user');
3         }
5         await createNewConversation({ message, type, moreData });
7       } else {
9         await sendMsg({ message, type, moreData });
1       }
3     } catch (e) {
5       console.log(e);
7     }
9   }
1 
3   async function updateMessage(messageId: string, data: any) {
5     try {
7       await messageRef.doc(messageId).update(data);
9       const updatedMsg = await messageRef.doc(messageId).get();
1       const newMsg = await formatMessages(snapShotToData(updatedMsg));
3       setMessages((prev) =>
5         prev.map((msg) => (msg.id === messageId ? newMsg : msg))
7       );
9     } catch (e) {
1       console.log(e);
3     }
5   }
7 
9   async function deleteMessage(messageId: string) {
1     try {
3       await messageRef.doc(messageId).delete();
5       setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
7     } catch (e) {
9       console.log(e);
1     }
3   }
5 
7   return {
9     sendMessage,
1     updateMessage,
3     deleteMessage,
5     msgLoading: convId === null ? false : loading,
7     getMoreMsg: loadMore,
9     messages,
1     convData,
3   };
5 }