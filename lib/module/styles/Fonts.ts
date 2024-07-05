import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Colors, resHeight, resWidth } from "../styles";

export const scaleFromFigma = (s: number): number => responsiveFontSize(s / 7.6);

type MarginProps = {
  l?: number | string;
  t?: number | string;
  r?: number | string;
  b?: number | string;
  x?: number | string;
  y?: number | string;
};

type AlignProps = {
  self?: string;
  text?: string;
  textVer?: string;
};

type DecorationProps = {
  dec?: string;
  decStyle?: string;
  secColor?: string;
};

type FontProps = MarginProps & AlignProps & DecorationProps & {
  op?: number;
};

const base = (fontSize: number = 14, color: string = Colors.text.primary) => ({
  fontSize: scaleFromFigma(fontSize),
  // fontFamily: "DMSans-Regular",
  color
});

const margin = (left?: number | string, top?: number | string, right?: number | string, bottom?: number | string, x?: number | string, y?: number | string) => ({
  marginLeft: typeof left === "number" ? resWidth(left) : left,
  marginTop: typeof top === "number" ? resHeight(top) : top,
  marginRight: typeof right === "number" ? resWidth(right) : right,
  marginBottom: typeof bottom === "number" ? resHeight(bottom) : bottom,
  marginHorizontal: typeof x === "number" ? resWidth(x) : x,
  marginVertical: typeof y === "number" ? resHeight(y) : y
});

const align = (self: string = "auto", textAlign: string = "auto", textAlignVertical: string = "auto") => ({
  alignSelf: self,
  textAlign,
  textAlignVertical
});

const decoration = (dec?: string, style?: string, color?: string) => ({
  ...(typeof dec === "string" ? { textDecorationLine: dec } : {}),
  ...(typeof style === "string" ? { textDecorationStyle: style } : {}),
  ...(typeof color === "string" ? { textDecorationColor: color } : {})
});

const Fonts = {
  primary: {
    bold: (fontSize?: number, color?: string, props: FontProps = {}) => {
      const { l, t, r, b, x, y, self, text, op, dec, decStyle, secColor, textVer } = props;
      return {
        ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op,
        // fontFamily: "DMSans-Bold",
        fontWeight: "700"
      };
    },
    semibold: (fontSize?: number, color?: string, props: FontProps = {}) => {
      const { l, t, r, b, x, y, self, text, op, dec, decStyle, secColor, textVer } = props;
      return {
        ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op,
        // fontFamily: "DMSans-Bold",
        fontWeight: "600"
      };
    },
    medium: (fontSize?: number, color?: string, props: FontProps = {}) => {
      const { l, t, r, b, x, y, self, text, op, dec, decStyle, secColor, textVer } = props;
      return {
        ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        fontWeight: "500",
        opacity: op // fontFamily: "DMSans-Medium",
      };
    },
    regular: (fontSize?: number, color?: string, props: FontProps = {}) => {
      const { l, t, r, b, x, y, self, text, op, dec, decStyle, secColor, textVer } = props;
      return {
        ...base(fontSize, color),
        ...margin(l, t, r, b, x, y),
        ...align(self, text, textVer),
        ...decoration(dec, decStyle, secColor),
        opacity: op
      };
    },
    light: (fontSize?: number, color?: string, props: FontProps = {}) => {
      const { l, t, r, b, x, y, self, text, op, dec, decStyle, secColor } = props;
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
