"use strict";

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ImageStyle } from 'react-native';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 50 }) => {
  const { _config: { colors } } = React.getGlobal();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
          easing: Easing.linear,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: 0,
          easing: Easing.linear,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [animatedValue]);

  const angle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
    transform: [{ rotate: angle }],
    tintColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Animated.Image
      style={imageStyle}
      source={require('../assets/icons/loadingspinner.png')}
    />
  );
};

export default LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map
