import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useGlobal } from 'reactn';

export default function MessageList({ messages, loadMoreMsg, MessagesConfig }) {
  const [uid] = useGlobal('uid');
  const flatListRef = useRef();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        inverted={true}
        onLayout={() =>
          setTimeout(() => flatListRef.current?.scrollToOffset({ y: 0 }), 300)
        }
        onEndReached={() => loadMoreMsg()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          paddingHorizontal: 22,
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
        keyExtractor={(item, index) => index.toString()}
        data={messages}
        renderItem={({ item }) => {
          const { sender, type } = item;
          const MessageComponent =
            MessagesConfig?.find((conf) => conf?.type === type)?.component ||
            null;
          if (!MessageComponent) {
            console.log(`Message type ${type} not found in config array`);
            return null;
          } else {
            return <MessageComponent isMyMessage={sender === uid} {...item} />;
          }
        }}
        extraData={messages}
      />
    </View>
  );
}
