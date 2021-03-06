import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts, Palette, Style as styles } from '@react-native-minuit/styles';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import LinearGradiant from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/core';
import { useGlobal } from 'reactn';

const routes = [{ name: 'Search' }, { name: 'Cart' }, { name: 'Orders' }];

export default function TabBar() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colors = [Palette.grey, Palette.mainGrey];
  const [cart] = useGlobal('cart');
  const itemsInCart = useMemo(
    () => cart?.products?.reduce((t, p) => t + p.quantity, 0),
    [cart]
  );

  return (
    <View
      pointerEvents={'box-none'}
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
              {route.name === 'Cart' && itemsInCart > 0 && (
                <View
                  style={{
                    ...StyleSheet.absoluteFill,
                    bottom: null,
                    left: null,
                    top: -5,
                    right: 5,
                    width: 17,
                    height: 17,
                    backgroundColor: Palette.red,
                    borderRadius: 999,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={Fonts.primary.bold(10, Palette.white)}>
                    {itemsInCart}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
      <LinearGradiant
        pointerEvents="none"
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.10)']}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
