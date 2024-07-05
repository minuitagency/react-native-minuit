"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

import _Palette from "./Palette";

enum Color {
  White = _Palette.default.white,
  MainGrey = _Palette.default.mainGrey,
  MainPink = _Palette.default.mainPink,
}

interface TextColors {
  primary: string;
  secondary: string;
  link: string;
}

interface ButtonColors {
  background: string;
  text: string;
  border: string;
}

interface ButtonVariants {
  primary: ButtonColors;
  secondary: ButtonColors;
}

interface InputColors {
  background: string;
  text: string;
  placeholder: string;
}

interface Colors {
  background: string;
  text: TextColors;
  button: ButtonVariants;
  input: InputColors;
}

const Colors: Colors = {
  background: Color.White,
  text: {
    primary: "rgba(0,0,0,0.7)",
    secondary: Color.MainGrey,
    link: Color.MainGrey
  },
  button: {
    primary: {
      background: Color.MainPink,
      text: Color.White,
      border: Color.MainPink
    },
    secondary: {
      background: "transparent",
      text: Color.MainGrey,
      border: Color.MainGrey
    }
  },
  input: {
    background: Color.MainGrey,
    text: Color.MainGrey,
    placeholder: "#8E9192"
  }
};

var _default = Colors;
exports.default = _default;
//# sourceMappingURL=Colors.js.map
