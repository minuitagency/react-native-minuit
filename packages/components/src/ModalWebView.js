import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Colors from './styles/colors';
import { gutters } from './styles/global';
import Fonts from './styles/fonts';

const ModalWebView = ({visible, onDismiss, uri, onNavigationStateChange}) => {
  return (
    <Modal
      presentationStyle={'formSheet'}
      animationType="slide"
      visible={visible}
      onDismiss={onDismiss}
    >
      <View style={{flex: 1, backgroundColor: Colors.background}}>
        <Pressable onPress={onDismiss} style={{padding: gutters}}>
          <Text style={Fonts.primary.medium(13)}>
            Fermer
          </Text>
        </Pressable>

        <WebView
          source={{ uri }}
          onNavigationStateChange={onNavigationStateChange}
          style={{flex: 1}}
        />
      </View>
    </Modal>
  );
};

export default ModalWebView;
