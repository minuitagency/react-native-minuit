"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinuitProvider = void 0;

import React, { ReactNode } from 'react';
import { ShakeProvider, LoadingProvider, TooltipProvider } from './providers';

interface MinuitProviderProps {
  projectID?: string | null;
  children: ReactNode;
}

enum Colors {
  Primary = 'rgba(0,187,255,0.57)',
  Secondary = 'rgba(34,119,183,0.57)',
  Destructive = 'red'
}

const MinuitProvider: React.FC<MinuitProviderProps> = ({ projectID = null, children }) => {
  React.setGlobal({
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

exports.MinuitProvider = MinuitProvider;
//# sourceMappingURL=index.js.map