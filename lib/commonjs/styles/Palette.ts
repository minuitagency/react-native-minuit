"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

enum Color {
  Primary = '#fb68a8',
  TransparentPink = 'rgba(251, 104, 168, 0.1)',
  MainWhite = '#fff',
  TransparentWhite = 'rgba(255,255,255,0.1)',
  MainBlack = '#13131a',
  OverlayBlack = 'rgba(0,0,0,0.85)',
  MainPurple = '#9FA2A0',
  AlternatePurple = '#16121E',
  DarkPurple = '#1c1c24',
  DarkPurpleTransparent = 'rgba(28, 28, 36, 0.9)',
  LightPurple = '#979797',
  FluoPurple = '#5B479C',
  MainOrange = 'orange',
  MainGrey = '#CDCDCD',
  LightGrey = '#CCCCCC',
  DarkGrey = '#333333',
  LightYellow = 'rgba(193,156,252,0.4)',
  MainGreen = '#4eb939',
  LightGreen = 'rgba(29,191,115,0.1)',
  MainRed = '#d93333'
}

type PaletteType = {
  primary: Color.Primary,
  transparentPink: Color.TransparentPink,
  mainWhite: Color.MainWhite,
  transparentWhite: Color.TransparentWhite,
  mainBlack: Color.MainBlack,
  overlayBlack: Color.OverlayBlack,
  mainPurple: Color.MainPurple,
  alternatePurple: Color.AlternatePurple,
  darkPurple: Color.DarkPurple,
  darkPurpleTransparent: Color.DarkPurpleTransparent,
  lightPurple: Color.LightPurple,
  fluoPurple: Color.FluoPurple,
  mainOrange: Color.MainOrange,
  mainGrey: Color.MainGrey,
  lightGrey: Color.LightGrey,
  darkGrey: Color.DarkGrey,
  lightYellow: Color.LightYellow,
  mainGreen: Color.MainGreen,
  lightGreen: Color.LightGreen,
  mainRed: Color.MainRed
};

const Palette: PaletteType = {
  primary: Color.Primary,
  transparentPink: Color.TransparentPink,
  mainWhite: Color.MainWhite,
  transparentWhite: Color.TransparentWhite,
  mainBlack: Color.MainBlack,
  overlayBlack: Color.OverlayBlack,
  mainPurple: Color.MainPurple,
  alternatePurple: Color.AlternatePurple,
  darkPurple: Color.DarkPurple,
  darkPurpleTransparent: Color.DarkPurpleTransparent,
  lightPurple: Color.LightPurple,
  fluoPurple: Color.FluoPurple,
  mainOrange: Color.MainOrange,
  mainGrey: Color.MainGrey,
  lightGrey: Color.LightGrey,
  darkGrey: Color.DarkGrey,
  lightYellow: Color.LightYellow,
  mainGreen: Color.MainGreen,
  lightGreen: Color.LightGreen,
  mainRed: Color.MainRed
};

export default Palette;
//# sourceMappingURL=Palette.js.map
