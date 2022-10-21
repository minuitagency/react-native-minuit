import React, { setGlobal } from "reactn";
import { TooltipProvider, LoadingProvider, ShakeProvider } from "./providers";

import cloudInstance, { projectsRef } from "./config/cloud";

import { useDataFromRef } from "./hooks";

const MinuitProvider = ({ projectID = null, children }) => {
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

  const { data: projectData } = useDataFromRef({
    ref: projectsRef.doc(projectID),
    documentID: "projectID",
    simpleRef: true,
    listener: true,
    refreshArray: [],
  });

  return (
    <ShakeProvider
      projectID={projectID}
      enabled={projectData?.enableShake || false}
    >
      <LoadingProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </LoadingProvider>
    </ShakeProvider>
  );
};

export { MinuitProvider };
