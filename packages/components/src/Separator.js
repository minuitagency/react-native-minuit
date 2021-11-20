import { View } from 'react-native';
import { gutters, Palette } from '@react-native-minuit/styles';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function Separator({ style, fullWidth = false }) {
  return (
    <View
      style={{
        backgroundColor: Palette.extraLightGrey,
        height: 1,
        width: fullWidth ? responsiveWidth(100) : '100%',
        marginBottom: responsiveHeight(2),
        marginHorizontal: fullWidth ? -gutters : 0,
        ...style,
      }}
    />
  );
}
