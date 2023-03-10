import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useGlobal } from 'reactn';
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
        if (!MessageComponent) {
          console.log(`Message type ${type} not found in config array`);
          return null;
        } else {
          return (
            <MessageComponent
              prevSenderIsSame={prevSenderIsSame}
              nextSenderIsSame={nextSenderIsSame}
              isMyMessage={sender === uid}
              {...item}
            />
          );
        }
      }}
      extraData={messages}
    />
  );
}
