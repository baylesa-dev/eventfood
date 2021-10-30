import styled, { css } from 'styled-components';

import { rgba } from 'theme/utils/rgb';

export const Container = styled.nav`
    display: flex;
    justify-content: space-between;
`;

export const Link = styled.div<{ active: boolean, indicator?: number }>`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacings.md} 0;
    cursor: pointer;
    position: relative;

    background-color: ${({ theme }) => rgba(theme.colors.primary.light, 0.2)};

    &:first-child {
        border-top-left-radius: ${({ theme }) => theme.radius.lg};
    }

    &:last-child {
        border-top-right-radius: ${({ theme }) => theme.radius.lg};
    }

    ${({ indicator }) => indicator && indicator > 0 && css`
    
        &:after {
            position: absolute;
            top: 2px;
            left: calc(50%);
            content: '${indicator}';
            display: flex;
            justify-content: center;
            align-items: center;
            width: 15px;
            height: 15px;
            background-color: ${({ theme }) => theme.colors.primary.light};
            border-radius: 100%;
            font-size: ${({ theme }) => theme.fonts.sizes.xxxs};
            font-weight: 800;
            font-family: 'IBM Plex Mono';
            color: ${({ theme }) => theme.colors.background}
        }
    `}
`;
