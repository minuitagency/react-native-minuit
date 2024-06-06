import React, { ReactNode } from 'react';
import { Image, Modal, TouchableOpacity } from 'react-native';
import { useGlobal } from 'reactn';
import { WebView } from 'react-native-webview';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { _rSize } from '../styles/SharedStyles';
import { icons } from '../assets';
interface WebViewProviderProps {
  children: ReactNode;
}
export default function WebViewProvider({ children }: WebViewProviderProps) {
  const [webviewURL, setWebviewURL] = useGlobal<string | null>('_webviewURL');
  const [config] = useGlobal<{ colors: { background: string; primary: string } }>('_config');
  const {
    colors: { background, primary },
  } = config;
  return (
    <>
      {children}
      <Modal
        presentationStyle={'formSheet'}
        animationType="slide"
        transparent={false}
        visible={!!webviewURL}
        onDismiss={async () => await setWebviewURL(null)}
      >
        <WebView source={{ uri: webviewURL }} style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={async () => await setWebviewURL(null)}
          style={{
            ..._rSize(8),
            position: 'absolute',
            top: responsiveHeight(2),
            left: responsiveWidth(4),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: background,
            borderWidth: 1,
          }}
        >
          <Image
            resizeMode={'contain'}
            source={icons.close}
            style={{ ..._rSize(6), tintColor: primary }}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
}