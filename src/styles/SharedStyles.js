import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const gutters = responsiveWidth(5.33);
export const _size = (size) => ({ width: size, height: size });
export const _rSize = (size) => ({
  width: responsiveWidth(size),
  height: responsiveWidth(size),
});
export const mainBorderRadius = 10;

const SharedStyle = StyleSheet.create({
  shadows: (color = 'rgba(0, 0, 0, 0.07)', width, height, radius) => ({
    shadowColor: color,
    shadowOffset: {
      width: width,
      height: height,
    },
    shadowOpacity: 1,
    shadowRadius: radius,
    elevation: radius,
  }),

  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerMain: {
    flex: 1,
    padding: gutters,
    paddingBottom: 0,
  },

  containerItem: {
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 10,
  },

  containerRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  containerColumnSpaceBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  separatorHorizontal: {
    width: '100%',
    height: 1,
    marginVertical: responsiveHeight(1.5),
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  iconDefault: {
    width: 20,
    height: 20,
  },
});

export default SharedStyle;
