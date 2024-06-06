import Colors from './Colors';
import Palette from './Palette';
import Fonts from './Fonts';
import SharedStyles, { gutters } from './SharedStyles';
export enum ColorEnum {
    RED = 'red',
    BLUE = 'blue',
    GREEN = 'green',
    YELLOW = 'yellow'
}
export type PaletteType = {
    primary: string;
    secondary: string;
    accent: string;
};
export type FontType = {
    family: string;
    size: number;
    weight: string;
};
export { Colors, Palette, Fonts, SharedStyles, gutters };