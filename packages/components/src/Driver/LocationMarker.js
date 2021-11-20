import React, { useGlobal } from 'reactn';
import { Image, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import UserOptions from '.././UserOptions';

import styles from './styles/sharedStyles';
import appColors from './styles/appColors';

export default function LocationMarker({
  coordinate,
  identifier,
  markerText = null,
  markerOptions = null,
}) {
  const [isDriverApp] = useGlobal('isDriverApp');

  return (
    <Marker
      {...{ coordinate, identifier }}
      centerOffset={{ x: 0, y: -15 }}
      style={[styles.containerCenter]}
    >
      {markerText && (
        <View
          style={[
            styles.containerRow,
            styles.containerCenter,
            styles.containerItem,
            styles.blackShadows,
            {
              position: 'absolute',
              top: responsiveHeight(-8),
              backgroundColor: appColors.mainWhite,
              width: responsiveWidth(40),
              padding: 15,
              zIndex: 500,
            },
          ]}
        >
          <Text style={[styles.textSmallMedium, { textAlign: 'center' }]}>
            {markerText}
          </Text>

          {markerOptions && <UserOptions options={markerOptions} />}

          <View
            style={{
              position: 'absolute',
              bottom: -7.5,
              right: '55%',
              width: 15,
              height: 15,
              transform: [{ rotate: '45deg' }],
              backgroundColor: appColors.mainWhite,
              borderRadius: 5,
            }}
          />
        </View>
      )}

      <Image
        resizeMode={'contain'}
        source={
          isDriverApp
            ? require('../assets/UI/locationMarkerDriver.png')
            : require('../assets/UI/locationMarker.png')
        }
        style={{ height: 50, width: 50 }}
      />
    </Marker>
  );
}
