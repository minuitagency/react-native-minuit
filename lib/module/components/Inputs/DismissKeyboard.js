import React from 'reactn';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
export default function DismissKeyboard(_ref) {
  let {
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => Keyboard.dismiss()
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, children));
}
//# sourceMappingURL=DismissKeyboard.js.map