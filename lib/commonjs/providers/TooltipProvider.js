"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactn = _interopRequireWildcard(require("reactn"));

var _reactNative = require("react-native");

var _reactNativeResponsiveDimensions = require("react-native-responsive-dimensions");

var _motion = require("@legendapp/motion");

var _styles = require("../styles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TooltipProvider(_ref) {
  let {
    children
  } = _ref;
  const [tooltip, setTooltip] = (0, _reactn.useGlobal)('_tooltip');
  const {
    _config: {
      colors
    } = {}
  } = (0, _reactn.getGlobal)();
  (0, _reactn.useEffect)(() => {
    const resetTimeout = setTimeout(async () => {
      setTooltip(null);
    }, 2500);
    return () => clearTimeout(resetTimeout);
  }, [tooltip]);

  function getBackgroundColor() {
    if ((tooltip === null || tooltip === void 0 ? void 0 : tooltip.type) === 'error') {
      return colors.destructive;
    }

    return colors.primary;
  }

  return /*#__PURE__*/_reactn.default.createElement(_reactn.default.Fragment, null, children, /*#__PURE__*/_reactn.default.createElement(_motion.Motion.View, {
    animate: {
      top: tooltip ? (0, _reactNativeResponsiveDimensions.responsiveHeight)(5) : -50
    },
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 400
    },
    style: { ..._styles.SharedStyles.containerCenter,
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: getBackgroundColor(),
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 30
    }
  }, /*#__PURE__*/_reactn.default.createElement(_reactNative.Text, {
    numberOfLines: 2,
    style: [_styles.Fonts.primary.regular(14, _styles.Palette.mainWhite), {
      textAlign: 'center',
      margin: 0
    }]
  }, tooltip === null || tooltip === void 0 ? void 0 : tooltip.text)));
}

var _default = TooltipProvider;
exports.default = _default;
//# sourceMappingURL=TooltipProvider.js.map