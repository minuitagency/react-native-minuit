"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scaleFromFigma = exports.default = void 0;

var _reactNativeResponsiveDimensions = require("react-native-responsive-dimensions");

var _styles = require("../styles");

const scaleFromFigma = s => (0, _reactNativeResponsiveDimensions.responsiveFontSize)(s / 7.6);

exports.scaleFromFigma = scaleFromFigma;

const base = function () {
  let fontSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 14;
  let color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _styles.Colors.text.primary;
  return {
    fontSize: scaleFromFigma(fontSize),
    ////fontFamily: "DMSans-Regular",
    color
  };
};

const margin = (left, top, right, bottom, x, y) => ({
  marginLeft: typeof left === "number" ? (0, _styles.resWidth)(left) : left,
  marginTop: typeof top === "number" ? (0, _styles.resHeight)(top) : top,
  marginRight: typeof right === "number" ? (0, _styles.resWidth)(right) : right,
  marginBottom: typeof bottom === "number" ? (0, _styles.resHeight)(bottom) : bottom,
  marginHorizontal: typeof x === "number" ? (0, _styles.resWidth)(x) : x,
  marginVertical: typeof y === "number" ? (0, _styles.resHeight)(y) : y
});

const align = function () {
  let self = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "auto";
  let textAlign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "auto";
  let textAlignVertical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "auto";
  return {
    alignSelf: self,
    textAlign,
    textAlignVertical
  };
};

const decoration = (dec, style, color) => ({ ...(typeof dec === "string" ? {
    textDecorationLine: dec
  } : {}),
  ...(typeof style === "string" ? {
    textDecorationStyle: style
  } : {}),
  ...(typeof color === "string" ? {
    textDecorationColor: color
  } : {})
});

const Fonts = {
  primary: {
    bold: function (fontSize, color) {
      let {
        l,
        t,
        r,
        b,
        x,
        y,
        self,
        text,
        op,
        dec,
        decStyle,
        secColor,
        textVer
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return { ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op,
        //fontFamily: "DMSans-Bold",
        fontWeight: "700"
      };
    },
    semibold: function (fontSize, color) {
      let {
        l,
        t,
        r,
        b,
        x,
        y,
        self,
        text,
        op,
        dec,
        decStyle,
        secColor,
        textVer
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return { ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op,
        //fontFamily: "DMSans-Bold",
        fontWeight: "600"
      };
    },
    medium: function (fontSize, color) {
      let {
        l,
        t,
        r,
        b,
        x,
        y,
        self,
        text,
        op,
        dec,
        decStyle,
        secColor,
        textVer
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return { ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        fontWeight: "500",
        opacity: op //fontFamily: "DMSans-Medium",

      };
    },
    regular: function (fontSize, color) {
      let {
        l,
        t,
        r,
        b,
        x,
        y,
        self,
        text,
        op,
        dec,
        decStyle,
        secColor,
        textVer
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return { ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op
      };
    },
    light: function (fontSize, color) {
      let {
        l,
        t,
        r,
        b,
        x,
        y,
        self,
        text,
        op,
        dec,
        decStyle,
        secColor
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return {
        fontWeight: "300",
        ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text),
        ...decoration(dec, decStyle, secColor),
        opacity: op
      };
    }
  }
};
var _default = Fonts;
exports.default = _default;
//# sourceMappingURL=Fonts.js.map