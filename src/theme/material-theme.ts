import { createTheme } from '@mui/material';

import themeColors from './colors';
import tokens from './tokens';

const defaultColors = themeColors(tokens);

export default createTheme({
    palette: {
        primary: {
            ...defaultColors.primary,
        },
        secondary: {
            ...defaultColors.secondary,
        },
        error: {
            ...defaultColors.error,
        }
    },
    typography: {
        fontFamily: 'Mulish',
        fontWeightBold: 800,
        fontWeightMedium: 600,
        fontWeightLight: 400,
        fontWeightRegular: 500,
    }
});
