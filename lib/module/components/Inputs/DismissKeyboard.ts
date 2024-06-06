import React, { ReactNode } from 'reactn';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

interface DismissKeyboardProps {
  children: ReactNode;
}

export default function DismissKeyboard({ children }: DismissKeyboardProps) {
  return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => Keyboard.dismiss()
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, children));
}
//# sourceMappingURL=DismissKeyboard.js.map