const enum PaletteColors {
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
  MainRed = '#d93333',
}

type PaletteType = {
  [key in keyof typeof PaletteColors]: string;
};

const Palette: PaletteType = {
  Primary: PaletteColors.Primary,
  TransparentPink: PaletteColors.TransparentPink,
  MainWhite: PaletteColors.MainWhite,
  TransparentWhite: PaletteColors.TransparentWhite,
  MainBlack: PaletteColors.MainBlack,
  OverlayBlack: PaletteColors.OverlayBlack,
  MainPurple: PaletteColors.MainPurple,
  AlternatePurple: PaletteColors.AlternatePurple,
  DarkPurple: PaletteColors.DarkPurple,
  DarkPurpleTransparent: PaletteColors.DarkPurpleTransparent,
  LightPurple: PaletteColors.LightPurple,
  FluoPurple: PaletteColors.FluoPurple,
  MainOrange: PaletteColors.MainOrange,
  MainGrey: PaletteColors.MainGrey,
  LightGrey: PaletteColors.LightGrey,
  DarkGrey: PaletteColors.DarkGrey,
  LightYellow: PaletteColors.LightYellow,
  MainGreen: PaletteColors.MainGreen,
  LightGreen: PaletteColors.LightGreen,
  MainRed: PaletteColors.MainRed,
};

export default Palette;