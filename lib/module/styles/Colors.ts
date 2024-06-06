import Palette from "./Palette";
enum Color {
  White = "white",
  MainGrey = "mainGrey",
  MainPink = "mainPink",
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
interface Button {
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
  button: Button;
  input: InputColors;
}
const Colors: Colors = {
  background: Palette[Color.White],
  text: {
    primary: "rgba(0,0,0,0.7)",
    secondary: Palette[Color.MainGrey],
    link: Palette[Color.MainGrey]
  },
  button: {
    primary: {
      background: Palette[Color.MainPink],
      text: Palette[Color.White],
      border: Palette[Color.MainPink]
    },
    secondary: {
      background: "transparent",
      text: Palette[Color.MainGrey],
      border: Palette[Color.MainGrey]
    }
  },
  input: {
    background: Palette[Color.MainGrey],
    text: Palette[Color.MainGrey],
    placeholder: "#8E9192"
  }
};
export default Colors;