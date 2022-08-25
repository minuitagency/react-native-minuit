"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../../styles");

var _assets = require("../../assets");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  const [showPassword, setShowPassword] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      height: 52,
      backgroundColor: _styles.Palette.lightGrey,
      borderRadius: 10
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    style: [{
      flex: 1,
      paddingHorizontal: 10
    }, _styles.Fonts.primary.semibold(15, _styles.Palette.blackBleuMarine), inputStyle],
    placeholder: placeholder,
    defaultValue: value,
    onChangeText: onChange,
    multiline: isTextarea,
    textAlignVertical: isTextarea ? 'top' : 'center',
    placeholderTextColor: _styles.Palette.green1,
    keyboardType: keyboardType,
    secureTextEntry: isPassword && !showPassword,
    returnKeyType: 'done'
  }, textInputProps)), isPassword && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: {
      position: 'absolute',
      right: 20,
      top: 20
    },
    onPress: () => setShowPassword(!showPassword)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: "contain",
    style: {
      width: 20,
      height: 20
    },
    source: _assets.icons.showHide
  })));
};

var _default = Input;
exports.default = _default;
//# sourceMappingURL=Input.js.map