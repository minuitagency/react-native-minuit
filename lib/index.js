"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
import { captureScreen } from "../lib1";

const _eventEmitter = new react_native_1.NativeEventEmitter(
  react_native_1.NativeModules.RNShakeEvent
);
exports.default = {
  addListener: (callback) => {
    const _subscription = _eventEmitter.addListener(
      "ShakeEvent",
      async (data) => {
        try {
          let uri = await captureScreen({
            format: "jpg",
            quality: 0.8,
            result: "data-uri",
          });
          callback?.(uri);
        } catch (error) {
          callback?.("");
        }
      }
    );
    return _subscription;
  },
  removeAllListeners: () => _eventEmitter.removeAllListeners("ShakeEvent"),
  removeCurrentListener: () => _eventEmitter.removeCurrentListener(),
};
//# sourceMappingURL=index.js.map
