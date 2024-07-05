import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, TextInputProps, KeyboardTypeOptions, StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Fonts, Palette, SharedStyles } from '../../styles';
import { icons } from '../../assets';

interface InputProps {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  value?: string;
  onChange?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  inputStyle?: StyleProp<TextStyle>;
  textInputProps?: TextInputProps;
  isPassword?: boolean;
  isTextarea?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  style,
  value,
  onChange,
  keyboardType,
  inputStyle,
  textInputProps = {},
  isPassword = false,
  isTextarea = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        { height: 52, backgroundColor: Palette.lightGrey, borderRadius: 10 },
        style,
      ]}
    >
      <TextInput
        style={[
          { flex: 1, paddingHorizontal: 10 },
          Fonts.primary.semibold(15, Palette.blackBleuMarine),
          inputStyle,
        ]}
        placeholder={placeholder}
        defaultValue={value}
        onChangeText={onChange}
        multiline={isTextarea}
        textAlignVertical={isTextarea ? 'top' : 'center'}
        placeholderTextColor={Palette.green1}
        keyboardType={keyboardType}
        secureTextEntry={isPassword && !showPassword}
        returnKeyType={'done'}
        {...textInputProps}
      />

      {isPassword && (
        <TouchableOpacity
          style={{ position: 'absolute', right: 20, top: 20 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
            source={icons.showHide}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
