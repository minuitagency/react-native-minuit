import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, TextInputProps, KeyboardTypeOptions } from 'react-native';

import { Fonts, Palette, SharedStyles } from '../../styles';
import { icons } from '../../assets';

interface InputProps {
  placeholder: string;
  style?: object;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  inputStyle?: object;
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
0         multiline={isTextarea}
02         textAlignVertical={isTextarea ? 'top' : 'center'}
04         placeholderTextColor={Palette.green1}
06         keyboardType={keyboardType}
08         secureTextEntry={isPassword && !showPassword}
10         returnKeyType={'done'}
12         {...textInputProps}
14       />
16 
18       {isPassword && (
20         <TouchableOpacity
22           style={{ position: 'absolute', right: 20, top: 20 }}
24           onPress={() => setShowPassword(!showPassword)}
26         >
28           <Image
30             resizeMode="contain"
32             style={{ width: 20, height: 20 }}
34             source={icons.showHide}
36           />
38         </TouchableOpacity>
40       )}
42     </View>
44   );
46 };
48 
50 export default Input;