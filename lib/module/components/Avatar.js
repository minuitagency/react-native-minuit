import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Motion } from '@legendapp/motion';
import { Blurhash } from 'react-native-blurhash';
import { Fonts, Palette, Style } from 'styles';
import { icons } from 'assets';
export default (_ref => {
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
  const [showBlurhash, setShowBlurhash] = useState(true);
  const statusIcon = status === 'CONFIRMED' ? icons.joined : status === 'PENDING' ? icons.waiting : null;
  const statusIconSize = 25 * size / 60;

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  if (profilePictureBlurhash) {
    console.log('has blurhash' + profilePictureBlurhash);
  }

  return /*#__PURE__*/React.createElement(Motion.View, {
    initial: {
      scale: 0.8,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1
    },
    style: [Style.con({
      size,
      mx: 5,
      cen: true
    }), style]
  }, /*#__PURE__*/React.createElement(View, {
    style: [Style.con({
      cen: true,
      size: size - 5,
      bor: 150,
      over: 'hidden',
      bg: Palette.primary,
      op: status === 'CONFIRMED' || !status ? 1 : 0.5
    }), isCreator ? {
      borderWidth: 3,
      borderColor: Palette.primary
    } : {}]
  }, profilePicture ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FastImage, {
    style: Style.con({
      w: '100%',
      h: '100%'
    }),
    source: {
      uri: profilePicture
    },
    onLoadEnd: () => setShowBlurhash(false)
  }), profilePictureBlurhash && showBlurhash && /*#__PURE__*/React.createElement(Blurhash, {
    blurhash: profilePictureBlurhash,
    style: [Style.con({
      w: '100%',
      h: '100%'
    }), { ...StyleSheet.absoluteFill
    }],
    resizeMode: "cover"
  })) : /*#__PURE__*/React.createElement(Text, {
    style: Fonts.primary.bold(size * 18 / 60, Palette.white)
  }, `${(firstName === null || firstName === void 0 ? void 0 : (_firstName$ = firstName[0]) === null || _firstName$ === void 0 ? void 0 : _firstName$.toUpperCase()) || ''}${(lastName === null || lastName === void 0 ? void 0 : (_lastName$ = lastName[0]) === null || _lastName$ === void 0 ? void 0 : _lastName$.toUpperCase()) || ''}`)), statusIcon && /*#__PURE__*/React.createElement(Motion.Image, {
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
    style: Style.con({
      pos: 'absolute',
      size: statusIconSize < 15 ? 15 : statusIconSize,
      bor: 50,
      r: -(5 * size) / 60,
      b: 0
    }),
    source: statusIcon
  }));
});
//# sourceMappingURL=Avatar.js.map