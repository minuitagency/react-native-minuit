import React, { setGlobal } from 'reactn';
import { TooltipProvider, LoadingProvider, ShakeProvider } from './providers';

interface MinuitProviderProps {
  projectID?: string | null;
  children: React.ReactNode;
}

enum Colors {
  Primary = 'rgba(0,187,255,0.57)',
  Secondary = 'rgba(34,119,183,0.57)',
  Destructive = 'red'
}

const MinuitProvider: React.FC<MinuitProviderProps> = ({ projectID = null, children }) => {
  setGlobal({
    _isLoading: false,
    _tooltip: null,
    _config: {
      colors: {
        primary: Colors.Primary,
        secondary: Colors.Secondary,
        destructive: Colors.Destructive
      }
    }
  });
  return /*#__PURE__*/React.createElement(ShakeProvider, {
    projectID: projectID
  }, /*#__PURE__*/React.createElement(LoadingProvider, null, /*#__PURE__*/React.createElement(TooltipProvider, null, children)));
};

export { MinuitProvider };