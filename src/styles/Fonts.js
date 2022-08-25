import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Colors, resHeight, resWidth } from "../styles";

export const scaleFromFigma = (s) => responsiveFontSize(s / 7.6);

const base = (fontSize = 14, color = Colors.text.primary) => ({
  fontSize: scaleFromFigma(fontSize),
  ////fontFamily: "DMSans-Regular",
  color,
});
const margin = (left, top, right, bottom, x, y) => ({
  marginLeft: typeof left === "number" ? resWidth(left) : left,
  marginTop: typeof top === "number" ? resHeight(top) : top,
  marginRight: typeof right === "number" ? resWidth(right) : right,
  marginBottom: typeof bottom === "number" ? resHeight(bottom) : bottom,
  marginHorizontal: typeof x === "number" ? resWidth(x) : x,
  marginVertical: typeof y === "number" ? resHeight(y) : y,
});
const align = (
  self = "auto",
  textAlign = "auto",
  textAlignVertical = "auto"
) => ({
  alignSelf: self,
  textAlign,
  textAlignVertical,
});
const decoration = (dec, style, color) => ({
  ...(typeof dec === "string" ? { textDecorationLine: dec } : {}),
  ...(typeof style === "string" ? { textDecorationStyle: style } : {}),
  ...(typeof color === "string" ? { textDecorationColor: color } : {}),
});
const Fonts = {
  primary: {
    bold: (
      fontSize,
      color,
      {
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
        textVer,
      } = {}
    ) => ({
      ...base(fontSize, color),
      ...margin(l, t, r, b, x, y),
      ...align(self, text, textVer),
      ...decoration(dec, decStyle, secColor),
      opacity: op,
      //fontFamily: "DMSans-Bold",
      fontWeight: "700",
    }),
    semibold: (
      fontSize,
      color,
      {
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
        textVer,
      } = {}
    ) => ({
      ...base(fontSize, color),
      ...margin(l, t, r, b, x, y),
      ...align(self, text, textVer),
      ...decoration(dec, decStyle, secColor),
      opacity: op,
      //fontFamily: "DMSans-Bold",
      fontWeight: "600",
    }),
    medium: (
      fontSize,
      color,
      {
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
        textVer,
      } = {}
    ) => ({
      ...base(fontSize, color),
      ...margin(l, t, r, b, x, y),
      ...align(self, text, textVer),
      ...decoration(dec, decStyle, secColor),
      fontWeight: "500",
      opacity: op,
      //fontFamily: "DMSans-Medium",
    }),
    regular: (
      fontSize,
      color,
      {
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
        textVer,
      } = {}
    ) => ({
      ...base(fontSize, color),
      ...margin(l, t, r, b, x, y),
      ...align(self, text, textVer),
      ...decoration(dec, decStyle, secColor),
      opacity: op,
    }),
    light: (
      fontSize,
      color,
      { l, t, r, b, x, y, self, text, op, dec, decStyle, secColor } = {}
    ) => ({
      fontWeight: "300",
      ...base(fontSize, color),
      ...margin(l, t, r, b, x, y),
      ...align(self, text),
      ...decoration(dec, decStyle, secColor),
      opacity: op,
    }),
  },
};

export default Fonts;
