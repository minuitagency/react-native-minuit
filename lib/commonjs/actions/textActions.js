"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalizeFirstLetter = capitalizeFirstLetter;

function capitalizeFirstLetter(string) {
  if (!string) {
    return;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}
//# sourceMappingURL=textActions.js.map