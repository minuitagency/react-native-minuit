import React, { ReactNode } from 'react';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

interface DismissKeyboardProps {
  children: ReactNode;
}

export default function DismissKeyboard({ children }: DismissKeyboardProps) {
  if (Platform.OS === "web") {
    return <View style={{ flex: 1 }}>{children}</View>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
