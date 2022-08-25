import React, { setGlobal } from 'reactn';
import { TooltipProvider, LoadingProvider, ShakeProvider } from './providers';

const MinuitProvider = _ref => {
  let {
    projectID = null,
    children
  } = _ref;
  setGlobal({
    _isLoading: false,
    _tooltip: null,
    _config: {
      colors: {
        primary: 'rgba(0,187,255,0.57)',
        secondary: 'rgba(34,119,183,0.57)',
        destructive: 'red'
      }
    }
  });
  return /*#__PURE__*/React.createElement(ShakeProvider, {
    projectID: projectID
  }, /*#__PURE__*/React.createElement(LoadingProvider, null, /*#__PURE__*/React.createElement(TooltipProvider, null, children)));
};

export { MinuitProvider };
//# sourceMappingURL=index.js.map