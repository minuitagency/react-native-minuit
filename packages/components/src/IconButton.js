import React from 'react';
import Style from '@react-native-minuit/styles';
import { Palette } from '@react-native-minuit/styles';
import { Image, TouchableOpacity } from 'react-native';

export default function IconButton({
  icon = undefined,
  onPress,
  containerStyle,
  iconStyle,
  containerSize = 40,
  iconSize = 25,
}) {
  return (
    <TouchableOpacity
      {...{ onPress }}
      style={{
        ...Style.shadow,
        width: containerSize,
        height: containerSize,
        backgroundColor: Palette.white,
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <Image
        source={icon}
        style={{ height: iconSize, width: iconSize, ...iconStyle }}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
}
