import React from 'react';
import { Image, TextInput as RNTextInput, View } from 'react-native';
import { Colors, Fonts } from '@react-native-minuit/styles';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default function TextInput(props) {
  const { leftIcon, containerStyle, textInputStyle } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: responsiveWidth(2),
        paddingLeft: leftIcon ? responsiveWidth(2) : responsiveWidth(4),
        backgroundColor: Colors.input.background,
        borderRadius: 10,
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      {leftIcon && (
        <Image
          source={leftIcon}
          style={{
            width: responsiveWidth(6),
            height: responsiveWidth(6),
            marginRight: responsiveWidth(2),
          }}
          resizeMode="contain"
        />
      )}
      <RNTextInput
        underlineColorAndroid="transparent"
        placeholderTextColor={Colors.input.placeholder}
        {...props}
        style={[
          Fonts.primary.regular(13),
          {
            padding: 0,
            color: Colors.input.text,
            flex: 1,
            height: 35,
            ...textInputStyle,
          },
        ]}
      />
    </View>
  );
}
