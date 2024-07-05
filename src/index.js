import React, { useState, useEffect, ReactNode } from 'reactn';
import {
  TooltipProvider,
  LoadingProvider,
  ShakeProvider,
  ConsoleLogProvider,
} from './providers';
import cloudInstance from './config/cloud';

type ThemeColors = {
  primary?: string;
  secondary?: string;
  background?: string;
  destructive?: string;
};

type MinuitProviderProps = {
  projectID?: string | null;
  projectId?: string | null;
  children: ReactNode;
  themeColors?: ThemeColors;
};

const defaultThemeColor: ThemeColors = {
  primary: 'rgba(0,187,255,0.57)',
  secondary: 'rgba(34,119,183,0.57)',
  background: 'black',
  destructive: 'red',
};

const MinuitProvider: React.FC<MinuitProviderProps> = ({
  projectID = null,
  projectId = null,
  children,
  themeColors = {},
}) => {
  const [isShakeEnabled, setIsShakeEnabled] = useState<boolean>(false);

  let _projectID: string | null = projectID || projectId || null;

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
