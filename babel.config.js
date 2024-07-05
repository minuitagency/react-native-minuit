// Import necessary types from TypeScript
import { Config } from 'metro-react-native-babel-preset';

// Define the type for the module exports
interface BabelConfig {
  presets: string[];
}

// Export the configuration as a TypeScript object
const babelConfig: BabelConfig = {
  presets: ['module:metro-react-native-babel-preset'],
};

export default babelConfig;
