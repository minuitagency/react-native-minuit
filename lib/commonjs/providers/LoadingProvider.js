"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactn = _interopRequireWildcard(require("reactn"));

var _reactNative = require("react-native");

var _react = require("react");

var _LoadingSpinner = _interopRequireDefault(require("../components/LoadingSpinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = _ref => {
  let {
    children
  } = _ref;
  const [isGlobalLoading] = (0, _reactn.useGlobal)('_isLoading');
  const [renderLoading, setRenderLoading] = (0, _react.useState)(false);
  const loadingAnimatedValue = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _reactn.useEffect)(() => {
    setRenderLoading(true);

    if (!isGlobalLoading) {
      return;
    }

    const anim = _reactNative.Animated.timing(loadingAnimatedValue, {
      toValue: isGlobalLoading ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    });

    anim.start(_ref2 => {
      let {
        finished
      } = _ref2;

      if (finished && !isGlobalLoading) {
        setRenderLoading(false);
      }
    });
    return anim.stop;
  }, [isGlobalLoading]);
  return /*#__PURE__*/_reactn.default.createElement(_reactn.default.Fragment, null, children, renderLoading && isGlobalLoading && /*#__PURE__*/_reactn.default.createElement(_reactNative.Animated.View, {
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      opacity: loadingAnimatedValue,
      ..._reactNative.StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.7)'
    }
  }, /*#__PURE__*/_reactn.default.createElement(_LoadingSpinner.default, null)));
};

exports.default = _default;
//# sourceMappingURL=LoadingProvider.js.map