"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function capitalizeFirstLetter(string: string): string | undefined {
  if (!string) {
    return;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}