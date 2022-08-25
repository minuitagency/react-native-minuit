import React, { getGlobal, useEffect, useGlobal } from 'reactn';
import { Text } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Motion } from '@legendapp/motion';
import { Fonts, Palette, SharedStyles } from '../styles';

function TooltipProvider(_ref) {
  let {
    children
  } = _ref;
  const [tooltip, setTooltip] = useGlobal('_tooltip');
  const {
    _config: {
      colors
    } = {}
  } = getGlobal();
  useEffect(() => {
    const resetTimeout = setTimeout(async () => {
      setTooltip(null);
    }, 2500);
    return () => clearTimeout(resetTimeout);
  }, [tooltip]);

  function getBackgroundColor() {
    if ((tooltip === null || tooltip === void 0 ? void 0 : tooltip.type) === 'error') {
      return colors.destructive;
    }

    return colors.primary;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, children, /*#__PURE__*/React.createElement(Motion.View, {
    animate: {
      top: tooltip ? responsiveHeight(5) : -50
    },
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 400
    },
    style: { ...SharedStyles.containerCenter,
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: getBackgroundColor(),
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 30
    }
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 2,
    style: [Fonts.primary.regular(14, Palette.mainWhite), {
      textAlign: 'center',
      margin: 0
    }]
  }, tooltip === null || tooltip === void 0 ? void 0 : tooltip.text)));
}

export default TooltipProvider;
//# sourceMappingURL=TooltipProvider.js.map