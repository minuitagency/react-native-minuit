import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
export const gutters: number = responsiveWidth(5.33);
export const mainBorderRadius: number = 10;
interface ShadowStyle {
  shadowColor: string;
  shadowOffset: {
    width?: number;
    height?: number;
  };
  shadowOpacity: number;
  shadowRadius?: number;
  elevation?: number;
}
const SharedStyle = StyleSheet.create({
  shadows: function (
    color: string = 'rgba(0, 0, 0, 0.07)',
    width?: number,
    height?: number,
    radius?: number
  ): ShadowStyle {
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