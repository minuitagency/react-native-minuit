import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Colors, resHeight, resWidth } from "../styles";

export const scaleFromFigma = (s: number): number => responsiveFontSize(s / 7.6);

interface BaseStyle {
  fontSize: number;
  color: string;
}

const base = function (fontSize: number = 14, color: string = Colors.text.primary): BaseStyle {
  return {
    fontSize: scaleFromFigma(fontSize),
    ////fontFamily: "DMSans-Regular",
    color
  };
};

interface MarginStyle {
  marginLeft?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
}

const margin = (left?: number | string, top?: number | string, right?: number | string, bottom?: number | string, x?: number | string, y?: number | string): MarginStyle => ({
  marginLeft: typeof left === "number" ? resWidth(left) : left,
  marginTop: typeof top === "number" ? resHeight(top) : top,
  marginRight: typeof right === "number" ? resWidth(right) : right,
  marginBottom: typeof bottom === "number" ? resHeight(bottom) : bottom,
  marginHorizontal: typeof x === "number" ? resWidth(x) : x,
  marginVertical: typeof y === "number" ? resHeight(y) : y
});

interface AlignStyle {
  alignSelf: string;
  textAlign: string;
  textAlignVertical: string;
}

const align = function (self: string = "auto", textAlign: string = "auto", textAlignVertical: string = "auto"): AlignStyle {
  return {
    alignSelf: self,
    textAlign,
    textAlignVertical
  };
};

interface DecorationStyle {
  textDecorationLine?: string;
  textDecorationStyle?: string;
  textDecorationColor?: string;
}

const decoration = (dec?: string, style?: string, color?: string): DecorationStyle => ({ ...(typeof dec === "string" ? {
    textDecorationLine: dec
  } : {}),
  ...(typeof style === "string" ? {
    textDecorationStyle: style
  } : {}),
  ...(typeof color === "string" ? {
    textDecorationColor: color
  } : {})
});

interface FontOptions {
  l?: number | string;
  t?: number | string;
  r?: number | string;
  b?: number | string;
  x?: number | string;
  y?: number | string;
  self?: string;
  text?: string;
  op?: number;
  dec?: string;
  decStyle?: string;
  secColor?: string;
  textVer?: string;
}

const Fonts = {
  primary: {
    bold: function (fontSize: number, color: string, options: FontOptions = {}) {
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
      } = options;
      return { ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op,
        //fontFamily: "DMSans-Bold",
        fontWeight: "700"
      };
    },
    semibold: function (fontSize: number, color: string, options: FontOptions = {}) {
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
      } = options;
      return { ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op,
        //fontFamily: "DMSans-Bold",
        fontWeight: "600"
      };
    },
    medium: function (fontSize: number, color: string, options: FontOptions = {}) {
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
      } = options;
      return { ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        fontWeight: "500",
        opacity: op //fontFamily: "DMSans-Medium",
      };
    },
    regular: function (fontSize: number, color: string, options: FontOptions = {}) {
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
      } = options;
      return { ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op
      };
    },
    light: function (fontSize: number, color: string, options: FontOptions = {}) {
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
      } = options;
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