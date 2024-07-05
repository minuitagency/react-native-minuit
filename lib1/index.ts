import React, { Component, ReactNode, RefObject } from "react";
import { View, NativeModules, Platform, findNodeHandle, ViewStyle } from "react-native";
const { RNViewShot } = NativeModules;

const neverEndingPromise = new Promise(() => {});

type Options = {
  width?: number;
  height?: number;
  format: "png" | "jpg" | "webm" | "raw";
  quality: number;
  result: "tmpfile" | "base64" | "data-uri" | "zip-base64";
  snapshotContentContainer: boolean;
};

if (!RNViewShot) {
  console.warn(
    "react-native-view-shot: NativeModules.RNViewShot is undefined. Make sure the library is linked on the native side."
  );
}

const acceptedFormats = ["png", "jpg"].concat(
  Platform.OS === "android" ? ["webm", "raw"] : []
);

const acceptedResults = ["tmpfile", "base64", "data-uri"].concat(
  Platform.OS === "android" ? ["zip-base64"] : []
);

const defaultOptions: Options = {
  format: "png",
  quality: 1,
  result: "tmpfile",
  snapshotContentContainer: false
};

// validate and coerce options
function validateOptions(
  input?: Partial<Options>
): { options: Options; errors: Array<string> } {
  const options: Options = {
    ...defaultOptions,
    ...input
  };
  const errors: Array<string> = [];
  if (
    "width" in options &&
    (typeof options.width !== "number" || options.width <= 0)
  ) {
    errors.push("option width should be a positive number");
    delete options.width;
  }
  if (
    "height" in options &&
    (typeof options.height !== "number" || options.height <= 0)
  ) {
    errors.push("option height should be a positive number");
    delete options.height;
  }
  if (
    typeof options.quality !== "number" ||
    options.quality < 0 ||
    options.quality > 1
  ) {
    errors.push("option quality should be a number between 0.0 and 1.0");
    options.quality = defaultOptions.quality;
  }
  if (typeof options.snapshotContentContainer !== "boolean") {
    errors.push("option snapshotContentContainer should be a boolean");
  }
  if (acceptedFormats.indexOf(options.format) === -1) {
    options.format = defaultOptions.format;
    errors.push(
      "option format '" +
        options.format +
        "' is not in valid formats: " +
        acceptedFormats.join(" | ")
    );
  }
  if (acceptedResults.indexOf(options.result) === -1) {
    options.result = defaultOptions.result;
    errors.push(
      "option result '" +
        options.result +
        "' is not in valid formats: " +
        acceptedResults.join(" | ")
    );
  }
  return { options, errors };
}

export function ensureModuleIsLoaded() {
  if (!RNViewShot) {
    throw new Error(
      "react-native-view-shot: NativeModules.RNViewShot is undefined. Make sure the library is linked on the native side."
    );
  }
}

export function captureRef<T>(
  view: number | View | RefObject<T>,
  optionsObject?: Partial<Options>
): Promise<string> {
  ensureModuleIsLoaded();
  if (
    view &&
    typeof view === "object" &&
    "current" in view &&
    view.current
  ) {
    view = view.current;
    if (!view) {
      return Promise.reject(new Error("ref.current is null"));
    }
  }
  if (typeof view !== "number") {
    const node = findNodeHandle(view);
    if (!node) {
      return Promise.reject(
        new Error("findNodeHandle failed to resolve view=" + String(view))
      );
    }
    view = node;
  }
  const { options, errors } = validateOptions(optionsObject);
  if (__DEV__ && errors.length > 0) {
    console.warn(
      "react-native-view-shot: bad options:\n" +
        errors.map(e => `- ${e}`).join("\n")
    );
  }
  return RNViewShot.captureRef(view, options);
}

export function releaseCapture(uri: string): void {
  if (typeof uri !== "string") {
    if (__DEV__) {
      console.warn("Invalid argument to releaseCapture. Got: " + uri);
    }
  } else {
    RNViewShot.releaseCapture(uri);
  }
}

export function captureScreen(optionsObject?: Partial<Options>): Promise<string> {
  ensureModuleIsLoaded();
  const { options, errors } = validateOptions(optionsObject);
  if (__DEV__ && errors.length > 0) {
    console.warn(
      "react-native-view-shot: bad options:\n" +
        errors.map(e => `- ${e}`).join("\n")
    );
  }
  return RNViewShot.captureScreen(options);
}

type Props = {
  options?: Partial<Options>;
  captureMode?: "mount" | "continuous" | "update";
  children: ReactNode;
  onLayout?: (e: any) => void;
  onCapture?: (uri: string) => void;
  onCaptureFailure?: (e: Error) => void;
  style?: ViewStyle;
};

function checkCompatibleProps(props: Props) {
  if (!props.captureMode && props.onCapture) {
    // in that case, it's authorized if you call capture() yourself
  } else if (props.captureMode && !props.onCapture) {
    console.warn(
      "react-native-view-shot: captureMode prop is defined but onCapture prop callback is missing"
    );
  } else if (
    (props.captureMode === "continuous" || props.captureMode === "update") &&
    props.options &&
    props.options.result &&
    props.options.result !== "tmpfile"
  ) {
    console.warn(
      "react-native-view-shot: result=tmpfile is recommended for captureMode=" +
        props.captureMode
    );
  }
}

export default class ViewShot extends Component<Props> {
  static captureRef = captureRef;
  static releaseCapture = releaseCapture;

  root: View | null = null;

  _raf: number | null = null;
  lastCapturedURI: string | null = null;

  resolveFirstLayout!: (layout: Object) => void;
  firstLayoutPromise: Promise<Object> = new Promise(resolve => {
    this.resolveFirstLayout = resolve;
  });

  capture = (): Promise<string> =>
    this.firstLayoutPromise
      .then(() => {
        const { root } = this;
        if (!root) return neverEndingPromise; // component is unmounted, you never want to hear back from the promise
        return captureRef(root, this.props.options);
      })
      .then(
        (uri: string) => {
          this.onCapture(uri);
          return uri;
        },
        (e: Error) => {
          this.onCaptureFailure(e);
          throw e;
        }
      );

  onCapture = (uri: string) => {
    if (!this.root) return;
    if (this.lastCapturedURI) {
      // schedule releasing the previous capture
      setTimeout(releaseCapture, 500, this.lastCapturedURI);
    }
    this.lastCapturedURI = uri;
    const { onCapture } = this.props;
    if (onCapture) onCapture(uri);
  };

  onCaptureFailure = (e: Error) => {
    if (!this.root) return;
    const { onCaptureFailure } = this.props;
    if (onCaptureFailure) onCaptureFailure(e);
  };

  syncCaptureLoop = (captureMode?: string) => {
    if (this._raf !== null) {
      cancelAnimationFrame(this._raf);
    }
    if (captureMode === "continuous") {
      let previousCaptureURI = "-"; // needs to capture at least once at first, so we use "-" arbitrary string
      const loop = () => {
        this._raf = requestAnimationFrame(loop);
        if (previousCaptureURI === this.lastCapturedURI) return; // previous capture has not finished, don't capture yet
        previousCaptureURI = this.lastCapturedURI;
        this.capture();
      };
      this._raf = requestAnimationFrame(loop);
    }
  };

  onRef = (ref: View | null) => {
    this.root = ref;
  };

  onLayout = (e: any) => {
    const { onLayout } = this.props;
    this.resolveFirstLayout(e.nativeEvent.layout);
    if (onLayout) onLayout(e);
  };

  componentDidMount() {
    if (__DEV__) checkCompatibleProps(this.props);
    if (this.props.captureMode === "mount") {
      this.capture();
    } else {
      this.syncCaptureLoop(this.props.captureMode);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.captureMode !== undefined) {
      if (this.props.captureMode !== prevProps.captureMode) {
        this.syncCaptureLoop(this.props.captureMode);
      }
    }
    if (this.props.captureMode === "update") {
      this.capture();
    }
  }

  componentWillUnmount() {
    this.syncCaptureLoop(undefined);
  }

  render() {
    const { children } = this.props;
    return (
      <View
        ref={this.onRef}
        collapsable={false}
        onLayout={this.onLayout}
        style={this.props.style}
      >
        {children}
      </View>
    );
  }
}
