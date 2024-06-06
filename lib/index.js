"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { NativeEventEmitter, NativeModules } from "react-native";
import { captureScreen } from "../lib1";
enum CaptureFormat {
  JPG = "jpg",
  PNG = "png",
}
interface CaptureOptions {
  format: CaptureFormat;
  quality: number;
  result: string;
}
type ShakeEventCallback = (uri: string) => void;
const _eventEmitter = new NativeEventEmitter(
  NativeModules.RNShakeEvent
);
const addListener = (callback: ShakeEventCallback) => {
  const _subscription = _eventEmitter.addListener(
    "ShakeEvent",
    async (data: any) => {
      try {
        let uri = await captureScreen({
          format: CaptureFormat.JPG,
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
};
const removeAllListeners = () => _eventEmitter.removeAllListeners("ShakeEvent");
const removeCurrentListener = () => _eventEmitter.removeCurrentListener();
export default {
  addListener,
  removeAllListeners,
  removeCurrentListener,
};