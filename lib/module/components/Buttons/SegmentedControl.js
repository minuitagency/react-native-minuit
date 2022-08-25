import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
export default function SegmentedControl(_ref) {
  let {
    options = [],
    selected = options[0],
    setSelected,
    style
  } = _ref;
  const [animatedValue] = React.useState(new Animated.Value(0));
  const buttonInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%']
  });
  React.useEffect(() => {
    Animated.timing(animatedValue, {
      useNativeDriver: false,
      toValue: selected ? 1 : 0,
      duration: 250
    }).start();
  }, [selected]);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      backgroundColor: '#EEEEEF',
      padding: 3,
      height: 35,
      borderRadius: 20,
      flexDirection: 'row',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      width: '50%',
      backgroundColor: 'white',
      borderRadius: 15,
      marginLeft: buttonInterpolation
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFillObject, {
      flexDirection: 'row'
    }]
  }, options.map((text, i) => {
    const isSelected = i === 0 && !selected || i === 1 && selected;
    return /*#__PURE__*/React.createElement(Pressable, {
      key: i,
      onPress: () => setSelected(i === 1),
      disabled: isSelected,
      style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        color: isSelected ? 'black' : 'gray'
      }
    }, text));
  })));
}
//# sourceMappingURL=SegmentedControl.js.map