import React from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { Fonts, Palette } from '@react-native-minuit/styles';
import { calcRating } from '@react-native-minuit/utils';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default function Rating({ value = [0, 0, 0, 0, 0, 0], style }) {
  const reducedValue = calcRating(value);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
      <Image
        source={require('assets/icons/star.png')}
        style={{
          width: responsiveWidth(5),
          height: responsiveWidth(5),
          tintColor: reducedValue < 4 ? Palette.lightGrey : '#FFA900',
          marginRight: responsiveWidth(1),
          marginTop: Platform.select({ android: -2 }),
          marginBottom: Platform.select({ ios: -1 }),
        }}
      />
      <Text style={Fonts.primary.regular(14, Palette.grey)}>
        {reducedValue}
      </Text>
    </View>
  );
}
