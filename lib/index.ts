"use strict";
import { NativeEventEmitter, NativeModules } from "react-native";
import { captureScreen } from "../lib1";

type ShakeEventCallback = (uri: string) => void;

interface ShakeEventListener {
  addListener: (callback: ShakeEventCallback) => any;
  removeAllListeners: () => void;
  removeCurrentListener: () => void;
}

const _eventEmitter = new NativeEventEmitter(NativeModules.RNShakeEvent);

const shakeEventListener: ShakeEventListener = {
  addListener: (callback: ShakeEventCallback) => {
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

export default shakeEventListener;
//# sourceMappingURL=index.js.map
