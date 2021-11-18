import { FlatList, View } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { gutters } from './styles/global';
import CategoryCard from './Card';
import React from 'react';
import categories from 'helpers/categories';

export default function CategoryList({onPress}) {
  return (
    <View style={{marginBottom: responsiveHeight(2)}}>
      <FlatList
        horizontal
        style={{marginHorizontal: -gutters}}
        contentContainerStyle={{paddingHorizontal: gutters}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(category, index) => `${category.text}-${index}`}
        data={Object.values(categories)}
        renderItem={({item: category}) => (
          <CategoryCard
            color={category.color}
            icon={category.icon}
            text={category.text}
            onPress={() => onPress(category.key)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{width: responsiveWidth(3)}} />
        )}
      />
    </View>
  );
}
