import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from './colors';

export const scaleFromFigma = (s) => responsiveFontSize(s / 7.6);

const base = (fontSize) => ({
  fontFamily: 'DMSans-Regular',
});

const Fonts = {
  primary: {
    bold: (fontSize, color) => ({
      ...base(fontSize),
      fontSize: scaleFromFigma(fontSize),
      color: color || Colors.text.primary,
      fontFamily: 'DMSans-Bold',
    }),
    semibold: (fontSize, color) => ({
      ...base(fontSize),
      fontSize: scaleFromFigma(fontSize),
      color: color || Colors.text.primary,
      fontFamily: 'DMSans-Medium',
    }),
    medium: (fontSize, color) => ({
      ...base(fontSize),
      fontSize: scaleFromFigma(fontSize),
      color: color || Colors.text.primary,
      fontFamily: 'DMSans-Medium',
    }),
    regular: (fontSize, color) => ({
      ...base(fontSize),
      fontSize: scaleFromFigma(fontSize),
      color: color || Colors.text.primary,
      fontFamily: 'DMSans-Regular',
    }),
  },
};

export default Fonts;
