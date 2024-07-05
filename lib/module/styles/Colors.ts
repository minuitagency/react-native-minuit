import Palette from "./Palette";

enum ColorType {
  Background = "background",
  TextPrimary = "textPrimary",
  TextSecondary = "textSecondary",
  TextLink = "textLink",
  ButtonPrimaryBackground = "buttonPrimaryBackground",
  ButtonPrimaryText = "buttonPrimaryText",
  ButtonPrimaryBorder = "buttonPrimaryBorder",
  ButtonSecondaryBackground = "buttonSecondaryBackground",
  ButtonSecondaryText = "buttonSecondaryText",
  ButtonSecondaryBorder = "buttonSecondaryBorder",
  InputBackground = "inputBackground",
  InputText = "inputText",
  InputPlaceholder = "inputPlaceholder"
}

type ColorScheme = {
  [ColorType.Background]: string;
  text: {
    [ColorType.TextPrimary]: string;
    [ColorType.TextSecondary]: string;
    [ColorType.TextLink]: string;
  };
  button: {
    primary: {
      [ColorType.ButtonPrimaryBackground]: string;
      [ColorType.ButtonPrimaryText]: string;
      [ColorType.ButtonPrimaryBorder]: string;
    };
    secondary: {
      [ColorType.ButtonSecondaryBackground]: string;
      [ColorType.ButtonSecondaryText]: string;
      [ColorType.ButtonSecondaryBorder]: string;
    };
  };
  input: {
    [ColorType.InputBackground]: string;
    [ColorType.InputText]: string;
    [ColorType.InputPlaceholder]: string;
  };
};

const Colors: ColorScheme = {
  [ColorType.Background]: Palette.white,
  text: {
    [ColorType.TextPrimary]: "rgba(0,0,0,0.7)",
    [ColorType.TextSecondary]: Palette.mainGrey,
    [ColorType.TextLink]: Palette.mainGrey
  },
  button: {
    primary: {
      [ColorType.ButtonPrimaryBackground]: Palette.mainPink,
      [ColorType.ButtonPrimaryText]: Palette.white,
      [ColorType.ButtonPrimaryBorder]: Palette.mainPink
    },
    secondary: {
      [ColorType.ButtonSecondaryBackground]: "transparent",
      [ColorType.ButtonSecondaryText]: Palette.mainGrey,
      [ColorType.ButtonSecondaryBorder]: Palette.mainGrey
    }
  },
  input: {
    [ColorType.InputBackground]: Palette.mainGrey,
    [ColorType.InputText]: Palette.mainGrey,
    [ColorType.InputPlaceholder]: "#8E9192"
  }
};

export default Colors;
//# sourceMappingURL=Colors.js.map
