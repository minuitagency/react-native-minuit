import React, { useRef, useState, useEffect } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useGlobal } from 'reactn';
import { gutters } from '../../styles';
interface Message {
  id: string;
  sender: string;
  type: string;
  [key: string]: any;
}
interface MessagesConfigItem {
  type: string;
  component: React.ComponentType<any>;
}
interface MessageListProps {
  messages: Message[];
  loadMoreMsg: () => void;
  MessagesConfig: MessagesConfigItem[];
  loadingComponent?: React.ReactNode;
  style?: FlatListProps<Message>['style'];
  contentContainerStyle?: FlatListProps<Message>['contentContainerStyle'];
}
const MessageList: React.FC<MessageListProps> = ({
  messages,
  loadMoreMsg,
  MessagesConfig,
  loadingComponent = null,
  style,
  contentContainerStyle,
}) => {
  const [uid] = useGlobal('uid');
  const flatListRef = useRef<FlatList<Message>>(null);
  const [lastMessageId, setLastMessageId] = useState<string | undefined>(messages[0]?.id);
  useEffect(() => {
    const currentLastMessageId = messages[0]?.id;
    if (currentLastMessageId !== lastMessageId) {
      setLastMessageId(currentLastMessageId);
      flatListRef.current?.scrollToOffset({ y: 0 }, 200);
    }
  }, [messages, lastMessageId]);
  return (
    <FlatList
      ref={flatListRef}
      inverted={true}
      onLayout={() =>
        setTimeout(() => flatListRef.current?.scrollToOffset({ y: 0 }), 300)
      }
      ListFooterComponent={() => loadingComponent && loadingComponent}
      onEndReached={() => loadMoreMsg()}
      onEndReachedThreshold={0.5}
      style={style}
      contentContainerStyle={{
        paddingBottom: responsiveHeight(2),
        paddingHorizontal: gutters,
        flexGrow: 1,
        justifyContent: 'flex-end',
        ...contentContainerStyle,
      }}
      keyExtractor={(item, index) => index.toString()}
      data={messages}
      renderItem={({ item, index }) => {
        const { sender, type } = item;
        const prevSenderIsSame =
          messages[index - 1]?.sender === messages[index]?.sender;
        const nextSenderIsSame =
          messages[index + 1]?.sender === messages[index]?.sender;
        const MessageComponent =
          MessagesConfig?.find((conf) => conf?.type === type)?.component ||
          null;
        const prevMsg = messages[index - 1] || null;
        if (!MessageComponent) {
          console.log(`Message type ${type} not found in config array`);
          return null;
        } else {
          return (
            <MessageComponent
              prevSenderIsSame={prevSenderIsSame}
              nextSenderIsSame={nextSenderIsSame}
              isMyMessage={sender === uid}
              prevMsg={prevMsg}
              {...item}
            />
          );
        }
      }}
      extraData={messages}
    />
  );
};
export default MessageList;