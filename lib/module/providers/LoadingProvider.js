import React, { useEffect, useGlobal } from 'reactn';
import { Animated, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
export default (_ref => {
  let {
    children
  } = _ref;
  const [isGlobalLoading] = useGlobal('_isLoading');
  const [renderLoading, setRenderLoading] = useState(false);
  const loadingAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setRenderLoading(true);

    if (!isGlobalLoading) {
      return;
    }

    const anim = Animated.timing(loadingAnimatedValue, {
      toValue: isGlobalLoading ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    });
    anim.start(_ref2 => {
      let {
        finished
      } = _ref2;

      if (finished && !isGlobalLoading) {
        setRenderLoading(false);
      }
    });
    return anim.stop;
  }, [isGlobalLoading]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children, renderLoading && isGlobalLoading && /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      opacity: loadingAnimatedValue,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.7)'
    }
  }, /*#__PURE__*/React.createElement(LoadingSpinner, null)));
});
//# sourceMappingURL=LoadingProvider.js.map