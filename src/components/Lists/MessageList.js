import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useEffect, useGlobal } from 'reactn';
import { gutters } from '../../styles';

export default function MessageList({
  messages,
  loadMoreMsg,
  MessagesConfig,
  loadingComponent = null,
  style,
  contentContainerStyle,
}) {
  const [uid] = useGlobal('uid');
  const flatListRef = useRef();

  const [lastMessageId, setLastMessageId] = useState(messages[0]?.id);

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
      ListFooterComponent={() => loadingComponent && loadingComponent()}
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
}
