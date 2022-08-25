import React, { useEffect, useRef, getGlobal } from 'reactn';
import { Animated, Easing } from 'react-native';

export default ({ size = 50 }) => {
  const {
    _config: { colors },
  } = getGlobal();

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
    return loop.stop;
  }, []);

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
      }}
      source={require('../assets/icons/loadingspinner.png')}
    />
  );
};
