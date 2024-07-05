import React, { ReactNode } from 'react';
import { Image, Modal, TouchableOpacity, ViewStyle, ImageStyle } from 'react-native';
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

interface Config {
  colors: {
    background: string;
    primary: string;
  };
}

const WebViewProvider: React.FC<WebViewProviderProps> = ({ children }) => {
  const [webviewURL, setWebviewURL] = useGlobal<string | null>('_webviewURL');
  const [config] = useGlobal<Config>('_config');

  const {
    colors: { background, primary },
  } = config;

  const closeButtonStyle: ViewStyle = {
    ..._rSize(8),
    position: 'absolute',
    top: responsiveHeight(2),
    left: responsiveWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: background,
    borderWidth: 1,
  };

  const closeButtonImageStyle: ImageStyle = {
    ..._rSize(6),
    tintColor: primary,
  };

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
          style={closeButtonStyle}
        >
          <Image
            resizeMode={'contain'}
            source={icons.close}
            style={closeButtonImageStyle}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default WebViewProvider;
