import React from 'react';
import {Text} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Motion} from '@legendapp/motion';
import {Fonts, gutters, Palette, SharedStyles} from '../../styles';
import {getGlobal} from 'reactn';
interface ButtonProps {
  beforeText?: () => React.ReactNode;
  containerStyle?: object;
  style?: object;
  text: string;
  onPress: () => void;
  primary?: boolean;
  textStyle?: object;
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
  isAbsoluteBottom = false,
}) => {
  const {
    _config: {colors = {}},
  } = getGlobal();
  const bgColor = primary ? colors.primary : Palette.tran;
  const textColorButton = primary ? Palette.mainWhite : textColor;
  return (
    <Motion.Pressable
      onPress={onPress}
      style={[
        {width: '100%'},
        isAbsoluteBottom
          ? {
              position: 'absolute',
              bottom: 2 * gutters,
              right: gutters,
              left: gutters,
            }
          : {},
        containerStyle,
      ]}>
      <Motion.View
        style={[
          SharedStyles.containerCenter,
          {
            height: responsiveHeight(5),
            borderRadius: 10,
            backgroundColor: bgColor,
            flexDirection: 'row',
          },
          {flexDirection: 'row'},
          style,
        ]}
        whileTap={{scale: 0.95}}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}>
        {beforeText?.()}
        <Text style={[Fonts.primary.bold(12, textColorButton), textStyle]}>
          {text}
        </Text>
      </Motion.View>
    </Motion.Pressable>
  );
};
export default Button;