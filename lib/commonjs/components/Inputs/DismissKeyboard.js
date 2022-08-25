"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DismissKeyboard;

var _reactn = _interopRequireDefault(require("reactn"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DismissKeyboard(_ref) {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_reactn.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => _reactNative.Keyboard.dismiss()
  }, /*#__PURE__*/_reactn.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, children));
}
//# sourceMappingURL=DismissKeyboard.js.map