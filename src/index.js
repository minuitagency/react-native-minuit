import React, { useState, setGlobal } from "reactn";
import { TooltipProvider, LoadingProvider, ShakeProvider } from "./providers";

import cloudInstance from "./config/cloud";

import { useEffect } from "react";

const MinuitProvider = ({ projectID = null, projectId = null, children }) => {
  const [isShakeEnabled, setIsShakeEnabled] = useState(false);

  let _projectID = projectID || projectId || null;

  setGlobal({
    _isLoading: false,
    _tooltip: null,
    _config: {
      colors: {
        primary: "rgba(0,187,255,0.57)",
        secondary: "rgba(34,119,183,0.57)",
        destructive: "red",
      },
    },
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
        .httpsCallable("shakes-isShakeEnabled")({
        projectID: _projectID,
      });

      console.log("Shake enabled: ", data);

      setIsShakeEnabled(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ShakeProvider projectID={_projectID} enabled={isShakeEnabled || false}>
      <LoadingProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </LoadingProvider>
    </ShakeProvider>
  );
};

export { MinuitProvider };
