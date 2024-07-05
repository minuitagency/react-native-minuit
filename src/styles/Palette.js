type Color = string;

interface Palette {
  primary: Color;
  transparentPink: Color;

  mainWhite: Color;
  transparentWhite: Color;

  mainBlack: Color;
  overlayBlack: Color;

  mainPurple: Color;
  alternatePurple: Color;
  darkPurple: Color;
  darkPurpleTransparent: Color;
  lightPurple: Color;
  fluoPurple: Color;

  mainOrange: Color;

  mainGrey: Color;
  lightGrey: Color;
  darkGrey: Color;

  lightYellow: Color;

  mainGreen: Color;
  lightGreen: Color;

  mainRed: Color;
}

const Palette: Palette = {
  primary: '#fb68a8',
  transparentPink: 'rgba(251, 104, 168, 0.1)',

  mainWhite: '#fff',
  transparentWhite: 'rgba(255,255,255,0.1)',

  mainBlack: '#13131a',
  overlayBlack: 'rgba(0,0,0,0.85)',

  mainPurple: '#9FA2A0',
  alternatePurple: '#16121E',
  darkPurple: '#1c1c24',
  darkPurpleTransparent: 'rgba(28, 28, 36, 0.9)',
  lightPurple: '#979797',
  fluoPurple: '#5B479C',

  mainOrange: 'orange',

  mainGrey: '#CDCDCD',
  lightGrey: '#CCCCCC',
  darkGrey: '#333333',

  lightYellow: 'rgba(193,156,252,0.4)',

  mainGreen: '#4eb939',
  lightGreen: 'rgba(29,191,115,0.1)',

  mainRed: '#d93333',
};

export default Palette;
