"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LoadingProvider", {
  enumerable: true,
  get: function () {
    return _LoadingProvider.default;
  }
});
Object.defineProperty(exports, "ShakeProvider", {
  enumerable: true,
  get: function () {
    return _ShakeProvider.default;
  }
});
Object.defineProperty(exports, "TooltipProvider", {
  enumerable: true,
  get: function () {
    return _TooltipProvider.default;
  }
});

import _TooltipProvider from "./TooltipProvider";
import _LoadingProvider from "./LoadingProvider";
import _ShakeProvider from "./ShakeProvider";

function _interopRequireDefault(obj: any): { default: any } {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Define types and enums as needed
type Provider = {
  default: any;
};

export type { Provider };

// Export the providers
export const LoadingProvider: Provider = _LoadingProvider;
export const ShakeProvider: Provider = _ShakeProvider;
export const TooltipProvider: Provider = _TooltipProvider;

//# sourceMappingURL=index.js.map
