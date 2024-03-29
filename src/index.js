import React, { useState, setGlobal } from 'reactn';
import {
  TooltipProvider,
  LoadingProvider,
  ShakeProvider,
  ConsoleLogProvider,
} from './providers';
import cloudInstance from './config/cloud';

import { useEffect } from 'react';

const defaultThemeColor = {
  primary: 'rgba(0,187,255,0.57)',
  secondary: 'rgba(34,119,183,0.57)',
  background: 'black',
  destructive: 'red',
};

const MinuitProvider = ({
  projectID = null,
  projectId = null,
  children,
  themeColors = {},
}) => {
  const [isShakeEnabled, setIsShakeEnabled] = useState(false);

  let _projectID = projectID || projectId || null;

  setGlobal({
    _isLoading: false,
    _tooltip: null,
    _config: {
      colors: {
        ...defaultThemeColor,
        ...themeColors,
      },
    },
    _webviewURL: null,
    _zoomPicture: null,
    _consoleLogs: [],
  });

  useEffect(() => {
    if (!__DEV__ && _projectID) {
      checkIfShakeIsEnabled();
    }
  }, [_projectID]);

  const checkIfShakeIsEnabled = async () => {
    try {
      const { data } = await cloudInstance
        .functions()
        .httpsCallable('shakes-isShakeEnabled')({
        projectID: _projectID,
      });

      console.log('Shake enabled: ', data);

      setIsShakeEnabled(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ConsoleLogProvider>
      <ShakeProvider projectID={_projectID} enabled={isShakeEnabled || false}>
        <LoadingProvider>
          <TooltipProvider>
            {/*NATIVE MODULE NOT WORK*/}
            {/*<WebViewProvider>*/}
            {/*  <ZoomPictureProvider>*/}
            {children}
            {/*</ZoomPictureProvider>*/}
            {/*</WebViewProvider>*/}
          </TooltipProvider>
        </LoadingProvider>
      </ShakeProvider>
    </ConsoleLogProvider>
  );
};

export { MinuitProvider };
