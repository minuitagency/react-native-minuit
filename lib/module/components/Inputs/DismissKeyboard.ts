import React, { ReactNode } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

interface DismissKeyboardProps {
  children: ReactNode;
}

export default function DismissKeyboard({ children }: DismissKeyboardProps) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
//# sourceMappingURL=DismissKeyboard.js.map
