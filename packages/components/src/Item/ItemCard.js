import { Image, StyleSheet, Text, View } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Fonts, Palette } from '@react-native-minuit/styles';
import FastImage from 'react-native-fast-image';
import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import Tag from '../Tag';
import {
  calcDeliveryTime,
  deliveryTimeToInterval,
} from '@react-native-minuit/utils';
import ReactN from 'reactn';
import LinearGradiant from 'react-native-linear-gradient';
import { categories } from '@react-native-minuit/helpers';

export default function ProductCard({
  size = 'small',
  name = '',
  image = undefined,
  price = undefined,
  kg = undefined,
  rating = undefined,
  showAddToCart = false,
  showAddToList = false,
  showDetails = true,
  onPress = () => {},
  onAddToCart = () => {},
  disabled = false,
  data,
}) {
  const [currentLocation] = ReactN.useGlobal('currentLocation');

  return (
    <TouchableScale {...{ onPress, disabled }} friction={7} activeScale={0.95}>
      <View
        style={{
          borderRadius: 10,
          width:
            size === 'fullWidth'
              ? '100%'
              : responsiveWidth(size === 'small' ? 37 : 74),
          height: responsiveWidth(33),
          backgroundColor: Palette.extraLightGrey,
          overflow: 'hidden',
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
                <View
                  style={{ justifyContent: 'center', flexDirection: 'row' }}
                >
                  <Image
                    style={{
                      width: 18,
                      height: 16,
                      marginRight: responsiveWidth(1),
                    }}
                    resizeMode="contain"
                    source={require('assets/icons/bike.png')}
                  />
                  <Text style={Fonts.primary.regular(12)}>
                    {deliveryTimeToInterval(
                      calcDeliveryTime(
                        data.preparationTime,
                        data.location.geopoint.latitude &&
                          data.location.geopoint.longitude
                          ? data.location.geopoint
                          : {
                              latitude: data.location.geopoint._latitude,
                              longitude: data.location.geopoint._longitude,
                            }
                      )
                    )}
                  </Text>
                </View>
              </Tag>
            )}
          </View>
        </LinearGradiant>
      </View>
    </TouchableScale>
  );
}
