import React from 'reactn';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

export default function DismissKeyboard({ children }) {
  if (Platform.OS === "web") {
    return <View style={{ flex: 1 }}>{children}</View>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
