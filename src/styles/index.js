import Colors from './Colors';
import Palette from './Palette';
import Fonts from './Fonts';
import SharedStyles, { gutters } from './SharedStyles';

// Define types and enums as needed
type ColorType = typeof Colors;
type PaletteType = typeof Palette;
type FontType = typeof Fonts;
type SharedStylesType = typeof SharedStyles;
type GuttersType = typeof gutters;

export { Colors, Palette, Fonts, SharedStyles, gutters };
export type { ColorType, PaletteType, FontType, SharedStylesType, GuttersType };
