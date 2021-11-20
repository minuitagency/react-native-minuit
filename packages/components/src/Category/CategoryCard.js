import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Image, Text, View } from 'react-native';
import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import { Fonts as fonts, Palette } from '@react-native-minuit/styles';

const itemSize = responsiveWidth(18);
const imageContainerSize = itemSize / 2;

export default function CategoryCard({ color, icon, text, onPress, disabled }) {
  return (
    <TouchableScale
      {...{ onPress, disabled }}
      friction={7}
      activeScale={0.95}
      style={{ alignItems: 'center', maxWidth: itemSize }}
    >
      <View
        style={{
          borderRadius: itemSize / 2,
          backgroundColor: Palette.grey,
          height: itemSize,
          width: itemSize,
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: responsiveHeight(1),
          overflow: 'hidden',
        }}
      >
        <Image
          resizeMode={'contain'}
          source={icon}
          style={{
            flex: 1,
          }}
        />
      </View>
      <Text style={fonts.primary.medium(12)} numberOfLines={1}>
        {text}
      </Text>
    </TouchableScale>
  );
}
