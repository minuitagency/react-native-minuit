import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Palette } from '@react-native-minuit/styles';
import ReactN from 'reactn';

export default function Loading() {
  const [loading] = ReactN.useGlobal('loading');

  if (!loading) {
    return null;
  }

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      ]}
    >
      <View style={{ width: responsiveWidth(7), height: responsiveWidth(7) }}>
        <ActivityIndicator size="large" color={Palette.mainGrey} />
      </View>
    </View>
  );
}
