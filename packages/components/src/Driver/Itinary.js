import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Fonts from '@react-native-minuit/styles';
import { Palette } from '@react-native-minuit/styles';
import { Image } from 'react-native';

const { View, Text } = require('react-native');

function Icon({ icon, containerStyle }) {
  const containerSize = 40;
  return (
    <View
      style={{
        width: containerSize,
        height: containerSize,
        borderRadius: 999,
        backgroundColor: Palette.greyTransparent,
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <Image
        source={icon}
        style={{ width: containerSize / 1.75, height: containerSize / 1.75 }}
      />
    </View>
  );
}

export default function Itinary({ from, to }) {
  return (
    <View style={{ marginBottom: responsiveHeight(2) }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          icon={require('assets/icons/fork.png')}
          containerStyle={{ marginRight: responsiveWidth(4) }}
        />
        <View style={{ flex: 1 }}>
          <Text style={Fonts.primary.bold(18)}>{from.name}</Text>
          <Text style={Fonts.primary.regular(15, Palette.grey)}>
            {from.address}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: 20,
          height: responsiveHeight(3),
          width: 1,
          backgroundColor: Palette.grey,
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          icon={require('assets/icons/pin.png')}
          containerStyle={{ marginRight: responsiveWidth(4) }}
        />
        <View style={{ flex: 1 }}>
          <Text style={Fonts.primary.bold(18)}>{to.name}</Text>
          <Text style={Fonts.primary.regular(15, Palette.grey)}>
            {to.address}
          </Text>
        </View>
      </View>
    </View>
  );
}
