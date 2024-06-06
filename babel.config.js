export enum Presets {
  MetroReactNativeBabelPreset = 'module:metro-react-native-babel-preset',
}

export interface BabelConfig {
  presets: Presets[];
}

const babelConfig: BabelConfig = {
  presets: [Presets.MetroReactNativeBabelPreset],
};

export default babelConfig;