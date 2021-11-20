import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '@react-native-minuit/styles';
import Fonts from '@react-native-minuit/styles';

export default function Button({
  secondary = false,
  fullWidth = false,
  style,
  iconLeft,
  textColor,
  text,
  ...props
}) {
  const variant = secondary ? 'secondary' : 'primary';
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          backgroundColor: Colors.button[variant].background,
          opacity: pressed || props.disabled ? 0.75 : 1,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: Colors.button[variant].border,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          width: fullWidth ? '100%' : undefined,
          ...style,
        },
      ]}
    >
      {iconLeft && (
        <Image
          source={iconLeft}
          style={{
            width: 20,
            height: 20,
            tintColor: textColor || Colors.button[variant].text,
            marginRight: responsiveWidth(2),
          }}
          resizeMode="contain"
        />
      )}
      <Text
        style={[
          Fonts.primary.semibold(16),
          {
            textAlign: 'center',
            color: textColor || Colors.button[variant].text,
          },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}
