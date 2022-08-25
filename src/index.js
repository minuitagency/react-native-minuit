import React, { setGlobal } from 'reactn';
import { TooltipProvider, LoadingProvider, ShakeProvider } from './providers';

const MinuitProvider = ({ projectID = null, children }) => {
  setGlobal({
    _isLoading: false,
    _tooltip: null,
    _config: {
      colors: {
        primary: 'rgba(0,187,255,0.57)',
        secondary: 'rgba(34,119,183,0.57)',
        destructive: 'red',
      },
    },
  });

  return (
    <ShakeProvider projectID={projectID}>
      <LoadingProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </LoadingProvider>
    </ShakeProvider>
  );
};

export { MinuitProvider };
