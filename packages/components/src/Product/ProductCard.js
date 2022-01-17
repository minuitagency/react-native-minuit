import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Fonts, Palette } from '@react-native-minuit/styles';
import { calcTVA, getThumb } from '@react-native-minuit/utils';
import FastImage from 'react-native-fast-image';

export default ({ product, disabled = false }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TouchableOpacity
      {...{ disabled }}
      onPress={() => {
        navigation.navigate('Product', {
          product,
          seller: route.params.seller,
        });
      }}
      style={{
        flexDirection: 'row',
        paddingVertical: responsiveHeight(1.5),
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginRight: responsiveWidth(3),
        }}
      >
        <View>
          <Text
            numberOfLines={2}
            style={[
              Fonts.primary.regular(16),
              { marginBottom: responsiveHeight(0.5) },
            ]}
          >
            {product.name}
          </Text>
          {product.description && (
            <Text
              numberOfLines={2}
              style={[
                Fonts.primary.regular(13, Palette.grey),
                { marginBottom: responsiveHeight(0.5) },
              ]}
            >
              {product.description}
            </Text>
          )}
        </View>
        <Text
          numberOfLines={2}
          style={[
            Fonts.primary.medium(14),
            { marginBottom: responsiveHeight(0.5) },
          ]}
        >
          {calcTVA(product).toFixed(2)}€
        </Text>
      </View>
      <FastImage
        source={{
          uri:
            product.picture?.length > 0
              ? getThumb(product.picture[0].downloadURL)
              : undefined,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          borderRadius: 10,
          width: responsiveWidth(21),
          height: responsiveWidth(21),
          borderWidth: 1,
          borderColor: Palette.extraLightGrey,
          backgroundColor: Palette.extraLightGrey,
        }}
      />
    </TouchableOpacity>
  );
};
