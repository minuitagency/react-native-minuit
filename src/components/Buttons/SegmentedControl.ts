import React from "react";
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";

type SegmentedControlProps = {
  options: string[];
  selected: boolean;
  setSelected: (selected: boolean) => void;
  style?: ViewStyle;
  itemStyle?: TextStyle;
};

export default function SegmentedControl({
  options = [],
  selected = options[0],
  setSelected,
  style = {},
  itemStyle = {},
}: SegmentedControlProps) {
  const [animatedValue] = React.useState(new Animated.Value(0));

  const buttonInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      useNativeDriver: false,
      toValue: selected ? 1 : 0,
      duration: 250,
    }).start();
  }, [selected]);

  return (
    <View
      style={{
        backgroundColor: "#EEEEEF",
        padding: 3,
        height: 35,
        borderRadius: 20,
        flexDirection: "row",
        ...style,
      }}
    >
      <Animated.View
        style={{
          width: "50%",
          backgroundColor: "white",
          borderRadius: 15,
          marginLeft: buttonInterpolation,
        }}
      />
      <View style={[StyleSheet.absoluteFillObject, { flexDirection: "row" }]}>
        {options.map((text, i) => {
          const isSelected = (i === 0 && !selected) || (i === 1 && selected);
          return (
            <Pressable
              key={i}
              onPress={() => setSelected(i === 1)}
              disabled={isSelected}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                ...itemStyle,
              }}
            >
              <Text style={{ color: isSelected ? "black" : "gray" }}>
                {text}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}