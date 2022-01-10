export const Palette = {
  mainGrey: '#363F4E',
  yellow: '#FFCC00',
  blue: '#00a7ac',
  greyTransparent: 'rgba(54,63,78,0.1)',
  darkBlue: '#03989E',
  red: '#EA190C',
  redTransparent: 'rgba(234,25,12,0.1)',
  extraLightGrey: '#F7F7F7',
  lightGrey: '#A8A8B5',
  grey: '#707070',
  darkGrey: '#272D2F',
  black: '#1F1F24',
  white: '#ffffff',
  green: '#4CD964',
};

const Colors = {
  background: Palette.white,
  text: {
    primary: Palette.black,
    secondary: Palette.grey,
    link: Palette.mainGrey,
  },
  button: {
    primary: {
      background: Palette.mainGrey,
      text: Palette.white,
      border: Palette.black,
    },
    secondary: {
      background: 'transparent',
      text: Palette.black,
      border: Palette.mainGrey,
    },
  },
  input: {
    background: '#F7F7F7',
    text: Palette.black,
    placeholder: '#8E9192',
  },
};

export default Colors;
