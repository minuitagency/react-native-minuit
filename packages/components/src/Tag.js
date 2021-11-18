import React from 'react';
import {View} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default function Tag({children, single, small}) {
  return (
    <View
      style={{
        borderRadius: 9999,
        padding: responsiveWidth(small ? 2 : 3),
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        flexDirection: 'row',
        height: responsiveWidth(small ? 7.5 : 10),
      }}>
      {children}
    </View>
  );
}
