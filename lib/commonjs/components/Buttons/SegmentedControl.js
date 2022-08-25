"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SegmentedControl;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SegmentedControl(_ref) {
  let {
    options = [],
    selected = options[0],
    setSelected,
    style
  } = _ref;

  const [animatedValue] = _react.default.useState(new _reactNative.Animated.Value(0));

  const buttonInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%']
  });

  _react.default.useEffect(() => {
    _reactNative.Animated.timing(animatedValue, {
      useNativeDriver: false,
      toValue: selected ? 1 : 0,
      duration: 250
    }).start();
  }, [selected]);

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      backgroundColor: '#EEEEEF',
      padding: 3,
      height: 35,
      borderRadius: 20,
      flexDirection: 'row',
      ...style
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      width: '50%',
      backgroundColor: 'white',
      borderRadius: 15,
      marginLeft: buttonInterpolation
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFillObject, {
      flexDirection: 'row'
    }]
  }, options.map((text, i) => {
    const isSelected = i === 0 && !selected || i === 1 && selected;
    return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      key: i,
      onPress: () => setSelected(i === 1),
      disabled: isSelected,
      style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: {
        color: isSelected ? 'black' : 'gray'
      }
    }, text));
  })));
}
//# sourceMappingURL=SegmentedControl.js.map