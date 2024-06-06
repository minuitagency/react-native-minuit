import Palette from "./Palette";
enum Color {
  White = "white",
  MainGrey = "mainGrey",
  MainPink = "mainPink",
}
interface TextColors {
  primary: string;
  secondary: Color;
  link: Color;
}
interface ButtonColors {
  background: Color | string;
  text: Color;
  border: Color;
}
interface InputColors {
  background: Color;
  text: Color;
  placeholder: string;
}
interface Colors {
  background: Color;
  text: TextColors;
  button: {
    primary: ButtonColors;
    secondary: ButtonColors;
  };
  input: InputColors;
}
const Colors: Colors = {
  background: Color.White,
  text: {
    primary: "rgba(0,0,0,0.7)",
    secondary: Color.MainGrey,
    link: Color.MainGrey,
  },
  button: {
    primary: {
      background: Color.MainPink,
      text: Color.White,
      border: Color.MainPink,
    },
    secondary: {
      background: "transparent",
      text: Color.MainGrey,
      border: Color.MainGrey,
    },
  },
  input: {
    background: Color.MainGrey,
    text: Color.MainGrey,
    placeholder: "#8E9192",
  },
};
export default Colors;