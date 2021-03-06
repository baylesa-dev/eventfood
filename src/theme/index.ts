import colors from './colors';
import component from './component';
import { GlobalStyle } from './GlobalStyle';
import tokens from './tokens';

export { default as materialTheme } from './material-theme';

// @ts-ignore - bullshit
export default {
    GlobalStyle,
    colors: colors(tokens),
    fonts: tokens.fonts,
    radius: tokens.radius,
    sizes: tokens.sizes,
    spacings: tokens.spacings,
    components: component(tokens),
};
