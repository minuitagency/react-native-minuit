"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactn = _interopRequireWildcard(require("reactn"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = _ref => {
  let {
    size = 50
  } = _ref;
  const {
    _config: {
      colors
    }
  } = (0, _reactn.getGlobal)();
  const animatedValue = (0, _reactn.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _reactn.useEffect)(() => {
    const loop = _reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.timing(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
      easing: _reactNative.Easing.linear
    }), _reactNative.Animated.timing(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 0,
      easing: _reactNative.Easing.linear
    })]));

    loop.start();
    return loop.stop;
  }, []);
  const angle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return /*#__PURE__*/_reactn.default.createElement(_reactNative.Animated.Image, {
    style: {
      width: size,
      height: size,
      transform: [{
        rotate: angle
      }],
      tintColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    source: require('../assets/icons/loadingspinner.png')
  });
};

exports.default = _default;
//# sourceMappingURL=LoadingSpinner.js.map