import { FlatList, View } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { gutters } from '@react-native-minuit/styles';
import CategoryCard from './CategoryCard';
import React from 'react';
import { useGlobal } from 'reactn';

export default function CategoryList({ onPress }) {
  const [categories] = useGlobal('categories');
  return (
    <View style={{ marginBottom: responsiveHeight(2) }}>
      <FlatList
        horizontal
        style={{ marginHorizontal: -gutters }}
        contentContainerStyle={{ paddingHorizontal: gutters }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(category, index) => `${category.text}-${index}`}
        data={Object.values(categories)}
        renderItem={({ item: category }) => (
          <CategoryCard
            color={category.color}
            icon={category?.icon || undefined}
            text={category.text}
            onPress={() => onPress(category.key)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: responsiveWidth(3) }} />
        )}
      />
    </View>
  );
}
