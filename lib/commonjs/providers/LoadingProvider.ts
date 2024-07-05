"use strict";

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Animated, ViewStyle, StyleSheet } from 'react-native';
import { useGlobal } from 'reactn';
import LoadingSpinner from '../components/LoadingSpinner';

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isGlobalLoading] = useGlobal<boolean>('_isLoading');
  const [renderLoading, setRenderLoading] = useState<boolean>(false);
  const loadingAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setRenderLoading(true);

    if (!isGlobalLoading) {
      return;
    }

    const anim = Animated.timing(loadingAnimatedValue, {
      toValue: isGlobalLoading ? 1 : 0,
      duration: 200,
      useNativeDriver: true
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
            alignItems: 'center',
            justifyContent: 'center',
            opacity: loadingAnimatedValue,
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.7)'
          } as ViewStyle}
        >
          <LoadingSpinner />
        </Animated.View>
      )}
    </>
  );
};

export default LoadingProvider;
//# sourceMappingURL=LoadingProvider.js.map
