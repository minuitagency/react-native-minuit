import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Palette } from './styles/colors';
import Fonts from './styles/fonts';

export default function SegmentedControl({style, value: selected, onChange: setSelected, items = ['En cours', 'Passées']}) {
  const [animatedValue] = useState(new Animated.Value(0));

  const buttonInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const textInterpolation = (second = false) =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: second
        ? [Palette.mainGrey, Palette.white]
        : [Palette.white, Palette.mainGrey],
    });

  useEffect(() => {
    Animated.timing(animatedValue, {
      useNativeDriver: false,
      toValue: selected === 0 ? 0 : 1,
      duration: 250,
    }).start();
  }, [selected]);

  return (
    <View
      style={{
        backgroundColor: Palette.extraLightGrey,
        height: 45,
        borderRadius: 10,
        padding: 1,
        flexDirection: 'row',
        ...style,
      }}>
      <Animated.View
        style={{
          width: '50%',
          backgroundColor: Palette.mainGrey,
          borderRadius: 10,
          marginLeft: buttonInterpolation,
        }}
      />
      <View style={[StyleSheet.absoluteFillObject, {flexDirection: 'row'}]}>
        <TouchableOpacity
          onPress={() => setSelected(0)}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Animated.Text
            style={Fonts.primary.semibold(14, textInterpolation(false))}>
            {items[0]}
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected(1)}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Animated.Text
            style={Fonts.primary.semibold(14, textInterpolation(true))}>
            {items[1]}
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
