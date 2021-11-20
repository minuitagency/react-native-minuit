import { Image, Pressable, View } from 'react-native';
import Style from '@react-native-minuit/styles';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import React from 'react';
import { Palette } from '@react-native-minuit/styles';

export default function ListIcon({
  icon = undefined,
  children,
  style,
  multiline = false,
  arrowRight = false,
  onPress = () => {},
  color = Palette.black,
}) {
  return (
    <Pressable
      {...{ onPress }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...style,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: multiline ? 'flex-start' : 'center',
        }}
      >
        {icon && (
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              ...Style.icon,
              marginRight: responsiveWidth(3),
              tintColor: color,
            }}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: multiline ? 3 : 0,
            justifyContent: 'space-between',
            alignItems: multiline ? 'flex-start' : 'center',
          }}
        >
          {children}
          {arrowRight && (
            <Image
              source={require('assets/icons/arrowRight.png')}
              style={[Style.icon, { tintColor: color }]}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}
