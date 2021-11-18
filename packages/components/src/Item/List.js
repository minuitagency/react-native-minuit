import React from 'react';
import ProductCard from './Card';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/core';

export default function ItemList({seller = true, flatListProps, itemProps}) {
  const navigation = useNavigation();

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => `${item.id}`}
      renderItem={({item}) => (
        <ProductCard
          data={item}
          name={item.name}
          image={item.picture[0]?.downloadURL}
          rating={item.rating}
          onPress={() =>
            navigation.navigate(
              seller ? 'Seller' : 'Product',
              seller ? {seller: item} : {product: item},
            )
          }
          {...itemProps}
        />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={
            flatListProps.horizontal
              ? {width: responsiveWidth(3)}
              : {height: responsiveHeight(2)}
          }
        />
      )}
      {...flatListProps}
    />
  );
}
