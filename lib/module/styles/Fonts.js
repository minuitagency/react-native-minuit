import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Colors, resHeight, resWidth } from "../styles";
export const scaleFromFigma = s => responsiveFontSize(s / 7.6);

const base = function () {
  let fontSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 14;
  let color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Colors.text.primary;
  return {
    fontSize: scaleFromFigma(fontSize),
    ////fontFamily: "DMSans-Regular",
    color
  };
};

const margin = (left, top, right, bottom, x, y) => ({
  marginLeft: typeof left === "number" ? resWidth(left) : left,
  marginTop: typeof top === "number" ? resHeight(top) : top,
  marginRight: typeof right === "number" ? resWidth(right) : right,
  marginBottom: typeof bottom === "number" ? resHeight(bottom) : bottom,
  marginHorizontal: typeof x === "number" ? resWidth(x) : x,
  marginVertical: typeof y === "number" ? resHeight(y) : y
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
export default Fonts;
//# sourceMappingURL=Fonts.js.map