import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useGlobal } from 'reactn';
import { gutters } from 'src/styles';

export default function MessageList({
  messages,
  loadMoreMsg,
  MessagesConfig,
  loadingComponent = null,
}) {
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
        ListFooterComponent={() => loadingComponent && loadingComponent()}
        onEndReached={() => loadMoreMsg()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          paddingHorizontal: gutters,
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
