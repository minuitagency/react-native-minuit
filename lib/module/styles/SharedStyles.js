import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
export const gutters = responsiveWidth(5.33);
export const mainBorderRadius = 10;
const SharedStyle = StyleSheet.create({
  shadows: function () {
    let color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgba(0, 0, 0, 0.07)';
    let width = arguments.length > 1 ? arguments[1] : undefined;
    let height = arguments.length > 2 ? arguments[2] : undefined;
    let radius = arguments.length > 3 ? arguments[3] : undefined;
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