"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Colors", {
  enumerable: true,
  get: function () {
    return _Colors.default;
  }
});
Object.defineProperty(exports, "Fonts", {
  enumerable: true,
  get: function () {
    return _Fonts.default;
  }
});
Object.defineProperty(exports, "Palette", {
  enumerable: true,
  get: function () {
    return _Palette.default;
  }
});
Object.defineProperty(exports, "SharedStyles", {
  enumerable: true,
  get: function () {
    return _SharedStyles.default;
  }
});
Object.defineProperty(exports, "gutters", {
  enumerable: true,
  get: function () {
    return _SharedStyles.gutters;
  }
});

import _Colors from "./Colors";
import _Palette from "./Palette";
import _Fonts from "./Fonts";
import _SharedStyles, { gutters as _gutters } from "./SharedStyles";

export type ColorsType = typeof _Colors;
export type PaletteType = typeof _Palette;
export type FontsType = typeof _Fonts;
export type SharedStylesType = typeof _SharedStyles;

export { _Colors as Colors, _Palette as Palette, _Fonts as Fonts, _SharedStyles as SharedStyles, _gutters as gutters };

//# sourceMappingURL=index.js.map
