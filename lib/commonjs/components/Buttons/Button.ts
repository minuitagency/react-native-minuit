"use strict";

import React from "react";
import { Text, ViewStyle, TextStyle } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Motion } from "@legendapp/motion";
import { Palette, gutters, SharedStyles, Fonts } from "../../styles";
import { getGlobal } from "reactn";

interface ButtonProps {
  beforeText?: (() => JSX.Element) | null;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  text: string;
  onPress: () => void;
  primary?: boolean;
  textStyle?: TextStyle;
  textColor?: string;
  isAbsoluteBottom?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  beforeText = null,
  containerStyle = {},
  style = {},
  text,
  onPress,
  primary,
  textStyle,
  textColor,
  isAbsoluteBottom = false
}) => {
  const {
    _config: { colors }
  } = getGlobal();
  const bgColor = primary ? colors.primary : Palette.tran;
  const textColorButton = primary ? Palette.mainWhite : textColor;

  return (
    <Motion.Pressable
      onPress={onPress}
      style={[
        { width: '100%' },
        isAbsoluteBottom ? {
          position: 'absolute',
          bottom: 2 * gutters,
          right: gutters,
          left: gutters
        } : {},
        containerStyle
      ]}
    >
      <Motion.View
        style={[
          SharedStyles.containerCenter,
          {
            height: responsiveHeight(5),
            borderRadius: 10,
            backgroundColor: bgColor,
            flexDirection: 'row'
          },
          style
        ]}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {beforeText && beforeText()}
        <Text style={[Fonts.primary.bold(15, textColorButton), textStyle]}>
          {text}
        </Text>
      </Motion.View>
    </Motion.Pressable>
  );
};

export default Button;
//# sourceMappingURL=Button.js.map
