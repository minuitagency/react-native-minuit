import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Colors, Fonts, gutters } from '@react-native-minuit/styles';

const ModalWebView = ({ visible, onDismiss, uri, onNavigationStateChange }) => {
  return (
    <Modal
      presentationStyle={'formSheet'}
      animationType="slide"
      visible={visible}
      onDismiss={onDismiss}
    >
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Pressable onPress={onDismiss} style={{ padding: gutters }}>
          <Text style={Fonts.primary.medium(13)}>Fermer</Text>
        </Pressable>

        <WebView
          source={{ uri }}
          onNavigationStateChange={onNavigationStateChange}
          style={{ flex: 1 }}
        />
      </View>
    </Modal>
  );
};

export default ModalWebView;
