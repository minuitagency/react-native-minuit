"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinuitProvider = void 0;

var _reactn = _interopRequireWildcard(require("reactn"));

var _providers = require("./providers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const MinuitProvider = _ref => {
  let {
    projectID = null,
    children
  } = _ref;
  (0, _reactn.setGlobal)({
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
  return /*#__PURE__*/_reactn.default.createElement(_providers.ShakeProvider, {
    projectID: projectID
  }, /*#__PURE__*/_reactn.default.createElement(_providers.LoadingProvider, null, /*#__PURE__*/_reactn.default.createElement(_providers.TooltipProvider, null, children)));
};

exports.MinuitProvider = MinuitProvider;
//# sourceMappingURL=index.js.map