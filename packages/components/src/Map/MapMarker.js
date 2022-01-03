import React from 'reactn';
import { Image, Pressable, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { Fonts, Palette, Style } from '@react-native-minuit/styles';

function IconButton({ icon, onPress, style }) {
  const containerSize = 40;
  return (
    <Pressable
      {...{ onPress }}
      style={{
        height: containerSize,
        width: containerSize,
        borderRadius: containerSize / 5,
        backgroundColor: Palette.greyTransparent,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Image
        source={icon}
        style={{
          tintColor: Palette.mainGrey,
          width: containerSize / 1.5,
          height: containerSize / 1.5,
        }}
      />
    </Pressable>
  );
}

export default function LocationMarker({ coordinate, identifier, user }) {
  return (
    <Marker
      {...{ coordinate, identifier }}
      centerOffset={{ x: 0, y: -15 }}
      style={[Style.containerCenter]}
      pointerEvents="auto"
    >
      {user && (
        <View
          style={[
            Style.containerCenter,
            Style.containerItem,
            {
              flexDirection: 'column',
              position: 'absolute',
              top: responsiveHeight(-8),
              backgroundColor: Palette.white,
              width: responsiveWidth(40),
              padding: 15,
              zIndex: 500,
            },
          ]}
        >
          <Text style={[Fonts.primary.medium(16), { textAlign: 'center' }]}>
            {user.name || user.firstName}
          </Text>

          <View
            style={{
              position: 'absolute',
              bottom: -7.5,
              right: '55%',
              width: 15,
              height: 15,
              transform: [{ rotate: '45deg' }],
              backgroundColor: Palette.white,
              borderRadius: 5,
            }}
          />
        </View>
      )}

      <Image
        resizeMode={'contain'}
        source={require('assets/icons/map/smallPin.png')}
        style={{ height: 50, width: 50 }}
      />
    </Marker>
  );
}
