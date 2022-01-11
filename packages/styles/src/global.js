import { StyleSheet } from 'react-native';
import Colors, { Palette } from './colors';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export const gutters = responsiveWidth(5.33);
export const mainBorderRadius = 10;

const containerRow = {
  flexDirection: 'row',
  alignItems: 'center',
};

const containerCenter = {
  alignItems: 'center',
  justifyContent: 'center',
};

const containerSpaceBetween = {
  ...containerRow,
  justifyContent: 'space-between',
};

const containerRevertGutter = {
  margin: responsiveWidth(-5.33),
  padding: responsiveWidth(5.33),
};

const containerItem = {
  borderRadius: mainBorderRadius,
  backgroundColor: Palette.extraLightGrey,
  padding: responsiveWidth(4),
  ...containerSpaceBetween,
};

const containerRound = {
  ...containerCenter,
  backgroundColor: Palette.extraLightGrey,
  borderRadius: 500,
  overflow: 'hidden',
};

const Style = StyleSheet.create({
  containerRow,
  containerCenter,
  containerSpaceBetween,
  containerRevertGutter,
  containerItem,
  containerRound,
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 10,
  },
  bigShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 16,
  },
  main: {
    flex: 1,
    paddingHorizontal: gutters,
    backgroundColor: Colors.background,
  },
  mainScroll: {
    backgroundColor: Colors.background,
  },
  mainScrollContentContainer: {
    paddingHorizontal: gutters,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default Style;
