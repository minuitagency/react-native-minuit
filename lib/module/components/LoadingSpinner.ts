import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ImageStyle } from 'react-native';
import { getGlobal } from 'reactn';

interface GlobalConfig {
  colors: {
    primary: string;
  };
}

interface Props {
  size?: number;
}

const LoadingSpinner: React.FC<Props> = ({ size = 50 }) => {
  const { _config: { colors } } = getGlobal() as { _config: GlobalConfig };
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

  return (
    <Animated.Image
      style={{
        width: size,
        height: size,
        transform: [{ rotate: angle }],
        tintColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      } as ImageStyle}
      source={require('../assets/icons/loadingspinner.png')}
    />
  );
};

export default LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map