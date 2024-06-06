import React from 'react';
import { Text, TextStyle, ViewStyle } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Motion } from '@legendapp/motion';
import { Fonts, gutters, Palette, SharedStyles } from '../../styles';
import { getGlobal } from 'reactn';

interface ButtonProps {
    beforeText?: () => React.ReactNode;
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
        _config: {
            colors
        }
    } = getGlobal();
    const bgColor = primary ? colors.primary : Palette.tran;
    const textColorButton = primary ? Palette.mainWhite : textColor;
    return /*#__PURE__*/React.createElement(Motion.Pressable, {
        onPress: onPress,
        style: [{
            width: '100%'
        }, isAbsoluteBottom ? {
            position: 'absolute',
            bottom: 2 * gutters,
            right: gutters,
            left: gutters
        } : {}, containerStyle]
    }, /*#__PURE__*/React.createElement(Motion.View, {
        style: [SharedStyles.containerCenter, {
            height: responsiveHeight(5),
            borderRadius: 10,
            backgroundColor: bgColor,
            flexDirection: 'row'
        }, {
            flexDirection: 'row'
        }, style],
        whileTap: {
            scale: 0.95
        },
        transition: {
            type: 'spring',
            damping: 20,
            stiffness: 300
        }
    }, beforeText === null || beforeText === void 0 ? void 0 : beforeText(), /*#__PURE__*/React.createElement(Text, {
        style: [Fonts.primary.bold(15, textColorButton), textStyle]
    }, text)));
};

export default Button;
//# sourceMappingURL=Button.js.map