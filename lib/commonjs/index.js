"use strict";

import React, { ReactNode } from 'react';
import { ShakeProvider, LoadingProvider, TooltipProvider } from './providers';

interface MinuitProviderProps {
  projectID?: string | null;
  children: ReactNode;
}

const MinuitProvider: React.FC<MinuitProviderProps> = ({ projectID = null, children }) => {
  setGlobal({
    _isLoading: false,
    _tooltip: null,
    _config: {
      colors: {
        primary: 'rgba(0,187,255,0.57)',
        secondary: 'rgba(34,119,183,0.57)',
        destructive: 'red'
      }
    }
  });

  return (
    <ShakeProvider projectID={projectID}>
      <LoadingProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </LoadingProvider>
    </ShakeProvider>
  );
};

export { MinuitProvider };
//# sourceMappingURL=index.js.map
