import { Tokens } from './types';

export default function themeColors({ colors }: Tokens): Tokens {
    return {
        text: colors.black,
        notification: colors.red[500],
        disabled: colors.grey[400],
        primary: { main: '#31BF2C', light: '#70D96C' },
        secondary: { main: '#F2B807' },
        grey: { ...colors.grey },
        background: colors.white,
        white: colors.pureWhite,
        error: {
            main: colors.red[600],
            focus: colors.red[700],
            active: colors.red[800],
            light: colors.red[100],
        },
        critical: {
            main: colors.red[600],
            focus: colors.red[700],
            active: colors.red[800],
            light: colors.red[100],
        },
        warning: {
            main: colors.orange[500],
            focus: colors.orange[600],
            active: colors.orange[700],
            light: colors.orange[100],
        },
        success: {
            main: colors.green[600],
            focus: colors.green[700],
            active: colors.green[800],
            light: colors.green[100],
        },
        info: {
            main: colors.blue[600],
            focus: colors.blue[700],
            active: colors.blue[800],
            light: colors.blue[100],
        },
        dark: {
            ...colors.grey,
            main: colors.grey[700],
            focus: colors.grey[800],
            active: colors.grey[900],
            light: colors.grey[100],
        },
    };
}
