function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Fonts, Palette, SharedStyles } from '../../styles';
import { icons } from '../../assets';

const Input = _ref => {
  let {
    placeholder,
    style,
    value,
    onChange,
    keyboardType,
    inputStyle,
    textInputProps = {},
    isPassword = false,
    isTextarea = false
  } = _ref;
  const [showPassword, setShowPassword] = useState(false);
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      height: 52,
      backgroundColor: Palette.lightGrey,
      borderRadius: 10
    }, style]
  }, /*#__PURE__*/React.createElement(TextInput, _extends({
    style: [{
      flex: 1,
      paddingHorizontal: 10
    }, Fonts.primary.semibold(15, Palette.blackBleuMarine), inputStyle],
    placeholder: placeholder,
    defaultValue: value,
    onChangeText: onChange,
    multiline: isTextarea,
    textAlignVertical: isTextarea ? 'top' : 'center',
    placeholderTextColor: Palette.green1,
    keyboardType: keyboardType,
    secureTextEntry: isPassword && !showPassword,
    returnKeyType: 'done'
  }, textInputProps)), isPassword && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: {
      position: 'absolute',
      right: 20,
      top: 20
    },
    onPress: () => setShowPassword(!showPassword)
  }, /*#__PURE__*/React.createElement(Image, {
    resizeMode: "contain",
    style: {
      width: 20,
      height: 20
    },
    source: icons.showHide
  })));
};

export default Input;
//# sourceMappingURL=Input.js.map