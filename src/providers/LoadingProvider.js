import React, { useEffect, useGlobal } from "reactn";
import { Animated, StyleSheet } from "react-native";

import { useRef, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default ({ children }) => {
  const [isGlobalLoading] = useGlobal("_isLoading");
  const [config] = useGlobal("_config");

  const { colors = {} } = config;

  const [renderLoading, setRenderLoading] = useState(false);

  const loadingAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setRenderLoading(true);

    if (!isGlobalLoading) {
      return;
    }

    const anim = Animated.timing(loadingAnimatedValue, {
      toValue: isGlobalLoading ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    });

    anim.start(({ finished }) => {
      if (finished && !isGlobalLoading) {
        setRenderLoading(false);
      }
    });

    return anim.stop;
  }, [isGlobalLoading]);

  return (
    <>
      {children}

      {renderLoading && isGlobalLoading && (
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: loadingAnimatedValue,
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <LoadingSpinner color={colors.primary} />
        </Animated.View>
      )}
    </>
  );
};
