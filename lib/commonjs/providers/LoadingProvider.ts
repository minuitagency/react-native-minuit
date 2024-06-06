"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Animated, ViewStyle, StyleSheet } from 'react-native';
import { useGlobal } from 'reactn';
import LoadingSpinner from '../components/LoadingSpinner';

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isGlobalLoading] = useGlobal<boolean>('_isLoading');
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
      useNativeDriver: true
    });

    anim.start(({ finished }) => {
      if (finished && !isGlobalLoading) {
        setRenderLoading(false);
      }
    });

    return () => anim.stop();
  }, [isGlobalLoading]);

  return (
    <>
      {children}
      {renderLoading && isGlobalLoading && (
0         <Animated.View
02           style={{
04             alignItems: 'center',
06             justifyContent: 'center',
08             opacity: loadingAnimatedValue,
10             ...StyleSheet.absoluteFillObject,
12             backgroundColor: 'rgba(0,0,0,0.7)'
14           }}
16         >
18           <LoadingSpinner />
20         </Animated.View>
22       )}
24     </>
26   );
28 };
30 
32 export default LoadingProvider;