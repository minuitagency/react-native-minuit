import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette, Style as styles } from '@react-native-minuit/styles';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import LinearGradiant from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/core';

const routes = [{ name: 'Search' }, { name: 'Cart' }, { name: 'Orders' }];

export default function TabBar() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colors = [Palette.grey, Palette.mainGrey];
  //const [cart] = ReactN.useGlobal('cart');

  return (
    <LinearGradiant
      pointerEvents="box-none"
      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.10)']}
      style={{
        paddingTop: responsiveHeight(10),
        paddingBottom: insets.bottom || responsiveHeight(2),
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          ...styles.shadow,
          borderRadius: 9999,
          backgroundColor: Palette.white,
          flexDirection: 'row',
          width: 200,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: Palette.extraLightGrey,
          paddingVertical: 10,
        }}
      >
        {routes.map((route, index) => {
          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              onPress={onPress}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Image
                source={
                  route.name === 'Search'
                    ? require('assets/icons/search.png')
                    : route.name === 'Cart'
                    ? require('assets/icons/cart.png')
                    : require('assets/icons/time.png')
                }
                style={{
                  width: 24,
                  height: 24,
                  tintColor: colors[1],
                }}
                resizeMode="contain"
              />
            </Pressable>
          );
        })}
      </View>
    </LinearGradiant>
  );
}
