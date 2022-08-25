"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));

var _motion = require("@legendapp/motion");

var _reactNativeBlurhash = require("react-native-blurhash");

var _styles = require("styles");

var _assets = require("assets");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = _ref => {
  var _firstName$, _lastName$;

  let {
    size = 60,
    style = {},
    isCreator = false,
    firstName,
    lastName,
    phoneNumber,
    profilePicture = null,
    profilePictureBlurhash = null,
    status = null
  } = _ref;
  const [showBlurhash, setShowBlurhash] = (0, _react.useState)(true);
  const statusIcon = status === 'CONFIRMED' ? _assets.icons.joined : status === 'PENDING' ? _assets.icons.waiting : null;
  const statusIconSize = 25 * size / 60;

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  if (profilePictureBlurhash) {
    console.log('has blurhash' + profilePictureBlurhash);
  }

  return /*#__PURE__*/_react.default.createElement(_motion.Motion.View, {
    initial: {
      scale: 0.8,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1
    },
    style: [_styles.Style.con({
      size,
      mx: 5,
      cen: true
    }), style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.Style.con({
      cen: true,
      size: size - 5,
      bor: 150,
      over: 'hidden',
      bg: _styles.Palette.primary,
      op: status === 'CONFIRMED' || !status ? 1 : 0.5
    }), isCreator ? {
      borderWidth: 3,
      borderColor: _styles.Palette.primary
    } : {}]
  }, profilePicture ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNativeFastImage.default, {
    style: _styles.Style.con({
      w: '100%',
      h: '100%'
    }),
    source: {
      uri: profilePicture
    },
    onLoadEnd: () => setShowBlurhash(false)
  }), profilePictureBlurhash && showBlurhash && /*#__PURE__*/_react.default.createElement(_reactNativeBlurhash.Blurhash, {
    blurhash: profilePictureBlurhash,
    style: [_styles.Style.con({
      w: '100%',
      h: '100%'
    }), { ..._reactNative.StyleSheet.absoluteFill
    }],
    resizeMode: "cover"
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _styles.Fonts.primary.bold(size * 18 / 60, _styles.Palette.white)
  }, `${(firstName === null || firstName === void 0 ? void 0 : (_firstName$ = firstName[0]) === null || _firstName$ === void 0 ? void 0 : _firstName$.toUpperCase()) || ''}${(lastName === null || lastName === void 0 ? void 0 : (_lastName$ = lastName[0]) === null || _lastName$ === void 0 ? void 0 : _lastName$.toUpperCase()) || ''}`)), statusIcon && /*#__PURE__*/_react.default.createElement(_motion.Motion.Image, {
    initial: {
      scale: 0,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1
    },
    transition: {
      type: 'spring',
      stiffness: randomIntFromInterval(50, 150),
      damping: 20
    },
    style: _styles.Style.con({
      pos: 'absolute',
      size: statusIconSize < 15 ? 15 : statusIconSize,
      bor: 50,
      r: -(5 * size) / 60,
      b: 0
    }),
    source: statusIcon
  }));
};

exports.default = _default;
//# sourceMappingURL=Avatar.js.map