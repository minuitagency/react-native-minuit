"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Palette = _interopRequireDefault(require("./Palette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Colors = {
  background: _Palette.default.white,
  text: {
    primary: "rgba(0,0,0,0.7)",
    secondary: _Palette.default.mainGrey,
    link: _Palette.default.mainGrey
  },
  button: {
    primary: {
      background: _Palette.default.mainPink,
      text: _Palette.default.white,
      border: _Palette.default.mainPink
    },
    secondary: {
      background: "transparent",
      text: _Palette.default.mainGrey,
      border: _Palette.default.mainGrey
    }
  },
  input: {
    background: _Palette.default.mainGrey,
    text: _Palette.default.mainGrey,
    placeholder: "#8E9192"
  }
};
var _default = Colors;
exports.default = _default;
//# sourceMappingURL=Colors.js.map