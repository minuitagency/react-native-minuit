import React, { useEffect, useRef } from "reactn";
import { Animated, Easing, ImageStyle } from "react-native";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, color = "white" }) => {
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
    outputRange: ["0deg", "360deg"],
  });

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
    transform: [{ rotate: angle }],
    tintColor: color,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Animated.Image
      style={imageStyle}
      source={require("../assets/icons/loadingspinner.png")}
    />
  );
};

export default Spinner;
