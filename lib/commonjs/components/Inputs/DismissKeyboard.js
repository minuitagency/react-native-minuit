"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DismissKeyboard;
import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
interface DismissKeyboardProps {
  children: ReactNode;
}
function DismissKeyboard({ children }: DismissKeyboardProps) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}