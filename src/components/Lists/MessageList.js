import React, { useRef, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useEffect, useGlobal } from 'reactn';
import { gutters } from '../../styles';

const RenderMessageItem = React.memo(
  function RenderMessageItem({ item, index, data, MessagesConfig, uid }) {
    const { sender, type } = item;
    const prevSenderIsSame = data[index - 1]?.sender === item.sender;
    const nextSenderIsSame = data[index + 1]?.sender === item.sender;
    const MessageComponent =
      MessagesConfig?.find((conf) => conf?.type === type)?.component || null;
    const prevMsg = data[index - 1] || null;

    if (!MessageComponent) {
      console.warn(`RN_MINUIT: Message type ${type} not found in config array`);
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
  },
  (prevProps, nextProps) => {
    return prevProps.item === nextProps.item;
  }
);

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

  function scrollToEnd() {
    if (isWeb) {
      flatListRef.current?.scrollToEnd({ animated: true });
    } else {
      flatListRef.current?.scrollToOffset({ y: 0 }, 200);
    }
  }

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
      scrollToEnd();
    }
  }, [messages, lastMessageId]);

  return (
    <FlatList
      ref={flatListRef}
      inverted={!isWeb}
      onLayout={() => {
        setTimeout(() => scrollToEnd(), 300);
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
      keyExtractor={(item, index) => item?.id || index.toString()}
      data={data}
      renderItem={({ item, index }) => (
        <RenderMessageItem
          item={item}
          index={index}
          data={data}
          MessagesConfig={MessagesConfig}
          uid={uid}
        />
      )}
      {...FlatListProps}
    />
  );
}
