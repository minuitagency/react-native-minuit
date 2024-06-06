import React, { useEffect, useGlobal, ReactNode } from 'reactn';
import { Animated, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';
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
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: loadingAnimatedValue,
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >
          <LoadingSpinner />
        </Animated.View>
      )}
    </>
  );
};
export default LoadingProvider;