import React, { useRef, useState } from 'react';
import { FlatList, Platform } from 'react-native';
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
  ListHeaderComponent = null,
  scrollIndicator = true,
  FlatListProps = {},
}) {
  const [uid] = useGlobal('uid');
  const isWeb = Platform.OS === 'web';
  const data = isWeb ? [...messages].reverse() : messages;
  const flatListRef = useRef();

  const getLastMessageId = () => {
    if (isWeb) {
      return data[data.length - 1]?.id;
    } else {
      return data[0]?.id;
    }
  };

  const [lastMessageId, setLastMessageId] = useState(getLastMessageId());

  useEffect(() => {
    const currentLastMessageId = getLastMessageId();
    if (currentLastMessageId !== lastMessageId) {
      setLastMessageId(currentLastMessageId);
      flatListRef.current?.scrollToOffset({ y: 0 }, 200);
    }
  }, [messages, lastMessageId]);

  return (
    <FlatList
      ref={flatListRef}
      inverted={!isWeb}
      onLayout={() => {
        setTimeout(() => flatListRef.current?.scrollToOffset({ y: 0 }), 300);
      }}
      showsVerticalScrollIndicator={scrollIndicator}
      ListHeaderComponent={() =>
        ListHeaderComponent && !isWeb && <ListHeaderComponent />
      }
      ListFooterComponent={() => (
        <>
          {ListHeaderComponent && isWeb && <ListHeaderComponent />}
          {loadingComponent && loadingComponent()}
        </>
      )}
      onEndReached={() => loadMoreMsg()}
      onEndReachedThreshold={0.5}
      style={style}
      contentContainerStyle={[
        Platform.select({
          ios: { justifyContent: 'flex-end' },
          android: { justifyContent: 'flex-end' },
        }),
        {
          paddingBottom: responsiveHeight(2),
          paddingHorizontal: gutters,
          flexGrow: 1,
          ...contentContainerStyle,
        },
      ]}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item, index }) => {
        const { sender, type } = item;
        const prevSenderIsSame =
          data[index - 1]?.sender === data[index]?.sender;
        const nextSenderIsSame =
          data[index + 1]?.sender === data[index]?.sender;
        const MessageComponent =
          MessagesConfig?.find((conf) => conf?.type === type)?.component ||
          null;
        const prevMsg = data[index - 1] || null;
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
      {...FlatListProps}
    />
  );
}
