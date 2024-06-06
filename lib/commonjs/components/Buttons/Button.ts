"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

import React from 'react';
import { Text } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Motion } from '@legendapp/motion';
import { Palette, gutters, SharedStyles, Fonts } from '../../styles';
import { getGlobal } from 'reactn';

type ButtonProps = {
  beforeText?: () => JSX.Element | null;
  containerStyle?: object;
  style?: object;
  text: string;
  onPress: () => void;
  primary?: boolean;
  textStyle?: object;
  textColor?: string;
  isAbsoluteBottom?: boolean;
};

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
    _config: {
      colors
    }
  } = getGlobal();
  const bgColor = primary ? colors.primary : Palette.tran;
  const textColorButton = primary ? Palette.mainWhite : textColor;
  return (
    <Motion.Pressable
      onPress={onPress}
0       style={[{
02         width: '100%'
04       }, isAbsoluteBottom ? {
06         position: 'absolute',
08         bottom: 2 * gutters,
10         right: gutters,
12         left: gutters
14       } : {}, containerStyle]}
16     >
18       <Motion.View
20         style={[SharedStyles.containerCenter, {
22           height: responsiveHeight(5),
24           borderRadius: 10,
26           backgroundColor: bgColor,
28           flexDirection: 'row'
30         }, {
32           flexDirection: 'row'
34         }, style]}
36         whileTap={{
38           scale: 0.95
40         }}
42         transition={{
44           type: 'spring',
46           damping: 20,
48           stiffness: 300
50         }}
52       >
54         {beforeText?.()}
56         <Text
58           style={[Fonts.primary.bold(15, textColorButton), textStyle]}
60         >
62           {text}
64         </Text>
66       </Motion.View>
68     </Motion.Pressable>
70   );
72 };
74 
76 export default Button;
78 //# sourceMappingURL=Button.js.map