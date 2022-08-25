"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeResponsiveDimensions = require("react-native-responsive-dimensions");

var _motion = require("@legendapp/motion");

var _styles = require("../../styles");

var _reactn = require("reactn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Button = _ref => {
  let {
    beforeText = null,
    containerStyle = {},
    style = {},
    text,
    onPress,
    primary,
    textStyle,
    textColor,
    isAbsoluteBottom = false
  } = _ref;
  const {
    _config: {
      colors
    }
  } = (0, _reactn.getGlobal)();
  const bgColor = primary ? colors.primary : _styles.Palette.tran;
  const textColorButton = primary ? _styles.Palette.mainWhite : textColor;
  return /*#__PURE__*/_react.default.createElement(_motion.Motion.Pressable, {
    onPress: onPress,
    style: [{
      width: '100%'
    }, isAbsoluteBottom ? {
      position: 'absolute',
      bottom: 2 * _styles.gutters,
      right: _styles.gutters,
      left: _styles.gutters
    } : {}, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_motion.Motion.View, {
    style: [_styles.SharedStyles.containerCenter, {
      height: (0, _reactNativeResponsiveDimensions.responsiveHeight)(5),
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
  }, beforeText === null || beforeText === void 0 ? void 0 : beforeText(), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [_styles.Fonts.primary.bold(15, textColorButton), textStyle]
  }, text)));
};

var _default = Button;
exports.default = _default;
//# sourceMappingURL=Button.js.map