"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainBorderRadius = exports.gutters = exports.default = void 0;

import { StyleSheet } from "react-native";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const gutters: number = responsiveWidth(5.33);
exports.gutters = gutters;
const mainBorderRadius: number = 10;
exports.mainBorderRadius = mainBorderRadius;

interface ShadowStyle {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

const SharedStyle = StyleSheet.create({
  shadows: function (color: string = 'rgba(0, 0, 0, 0.07)', width?: number, height?: number, radius?: number): ShadowStyle {
    return {
      shadowColor: color,
      shadowOffset: {
        width: width,
        height: height
      },
      shadowOpacity: 1,
      shadowRadius: radius,
      elevation: radius
    };
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerMain: {
    flex: 1,
    padding: gutters,
    paddingBottom: 0
  },
  containerItem: {
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 10
  },
  containerRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerColumnSpaceBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  separatorHorizontal: {
    width: '100%',
    height: 1,
    marginVertical: responsiveHeight(1.5),
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  iconDefault: {
    width: 20,
    height: 20
  }
});

export default SharedStyle;
//# sourceMappingURL=SharedStyles.js.map