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
import * as _SharedStyles from "./SharedStyles";
function _getRequireWildcardCache(nodeInterop: boolean): WeakMap<any, any> | null { 
  if (typeof WeakMap !== "function") return null; 
  var cacheBabelInterop = new WeakMap(); 
  var cacheNodeInterop = new WeakMap(); 
  return (_getRequireWildcardCache = function (nodeInterop: boolean) { 
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop; 
  })(nodeInterop); 
}
function _interopRequireWildcard(obj: any, nodeInterop: boolean): any { 
  if (!nodeInterop && obj && obj.__esModule) { 
    return obj; 
  } 
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") { 
    return { default: obj }; 
  } 
  var cache = _getRequireWildcardCache(nodeInterop); 
  if (cache && cache.has(obj)) { 
    return cache.get(obj); 
  } 
  var newObj: any = {}; 
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; 
  for (var key in obj) { 
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { 
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; 
      if (desc && (desc.get || desc.set)) { 
        Object.defineProperty(newObj, key, desc); 
      } else { 
        newObj[key] = obj[key]; 
      } 
    } 
  } 
  newObj.default = obj; 
  if (cache) { 
    cache.set(obj, newObj); 
  } 
  return newObj; 
}
function _interopRequireDefault(obj: any): any { 
  return obj && obj.__esModule ? obj : { default: obj }; 
}