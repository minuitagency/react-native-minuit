import Palette from "./Palette";

const Colors = {
  background: Palette.white,
  text: {
    primary: "rgba(0,0,0,0.7)",
    secondary: Palette.mainGrey,
    link: Palette.mainGrey,
  },
  button: {
    primary: {
      background: Palette.mainPink,
      text: Palette.white,
      border: Palette.mainPink,
    },
    secondary: {
      background: "transparent",
      text: Palette.mainGrey,
      border: Palette.mainGrey,
    },
  },
  input: {
    background: Palette.mainGrey,
    text: Palette.mainGrey,
    placeholder: "#8E9192",
  },
};

export default Colors;
