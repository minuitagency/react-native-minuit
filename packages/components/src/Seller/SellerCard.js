import { Image, StyleSheet, Text, View } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Fonts, Palette } from '@react-native-minuit/styles';
import FastImage from 'react-native-fast-image';
import React, { useMemo } from 'react';
import TouchableScale from 'react-native-touchable-scale';
import Tag from '../Tag';
import {
  calcDeliveryTime,
  deliveryTimeToInterval,
  getLocFromGeopoint,
} from '@react-native-minuit/utils';
import { useGlobal } from 'reactn';
import LinearGradiant from 'react-native-linear-gradient';

export default function SellerCard({
  size = 'small',
  name = '',
  image = undefined,
  onPress = () => {},
  disabled = false,
  data,
}) {
  const [currentLocation] = useGlobal('selectedLocation');
  const [categories] = useGlobal('categories');
  const deliveryTime = useMemo(
    () =>
      deliveryTimeToInterval(
        calcDeliveryTime(
          data.preparationTime,
          getLocFromGeopoint(data.location)
        )
      ),
    [data.preparationTime, data.location]
  );

  return (
    <TouchableScale
      {...{ onPress, disabled: disabled || !data.sellerIsOpen }}
      friction={7}
      activeScale={0.95}
      style={{
        overflow: 'hidden',
        borderRadius: 10,
        width:
          size === 'fullWidth'
            ? '100%'
            : responsiveWidth(size === 'small' ? 37 : 74),
        height: responsiveWidth(40),
        backgroundColor: Palette.extraLightGrey,
      }}
    >
      <FastImage
        source={{ uri: image || undefined }}
        resizeMode={FastImage.resizeMode.cover}
        style={{ flex: 1 }}
      />
      <LinearGradiant
        colors={['rgba(0, 0, 0, 0.75)', 'rgba(0, 0, 0, 0)']}
        style={[
          StyleSheet.absoluteFillObject,
          {
            bottom: null,
            flexDirection: 'row',
            padding: responsiveWidth(4),
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: responsiveHeight(3),
          },
        ]}
      >
        <View>
          <Text
            numberOfLines={1}
            style={[
              Fonts.primary.medium(16, Palette.white),
              { marginBottom: 2 },
            ]}
          >
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              Fonts.primary.medium(13, Palette.white),
              { marginBottom: 2 },
            ]}
          >
            {categories[data.category].text}
          </Text>
        </View>
        <View>
          {currentLocation && (
            <Tag single small>
              <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <Image
                  style={{
                    width: 18,
                    height: 16,
                    marginRight: responsiveWidth(1),
                  }}
                  resizeMode="contain"
                  source={require('assets/icons/bike.png')}
                />
                <Text style={Fonts.primary.regular(12)}>{deliveryTime}</Text>
              </View>
            </Tag>
          )}
        </View>
      </LinearGradiant>
      {!data.sellerIsOpen && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.66)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Text style={Fonts.primary.regular(14, Palette.white)}>
            Ouvre{' '}
            {(data.available &&
              data.nextOpenDate?.calendar({
                sameDay: '[à] HH:mm',
                nextDay: '[demain à] HH:mm',
                nextWeek: '[la semaine prochaine]',
              })) ||
              'bientôt'}
          </Text>
        </View>
      )}
    </TouchableScale>
  );
}
