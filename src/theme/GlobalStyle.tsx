import {
    createGlobalStyle,
    DefaultTheme,
    GlobalStyleComponent,
} from 'styled-components';
import { normalize } from 'styled-normalize';

import t from './index';

// @ts-ignore - bullshit
export const GlobalStyle: GlobalStyleComponent<
    typeof t,
    DefaultTheme
> = createGlobalStyle`
    ${normalize}

    html {
        font-size: 16px;
        background-color: ${({ theme }) => theme.colors.background};
    }

    body {
        font-family: ${({ theme }) =>
            `${theme.fonts.families['sans-serif'].name}, sans-serif`};
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.5;
    }

    button,
    a {
        cursor: pointer;
    }
`;
