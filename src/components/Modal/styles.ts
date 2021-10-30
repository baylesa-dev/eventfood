import { animated } from 'react-spring';
import styled from 'styled-components';

import { rgba } from 'theme/utils/rgb';

type OpenProps = {
    open: boolean;
};

export const Overlay = styled.div<OpenProps>`
    position: fixed;
    display: ${({ open }) => (open ? 'block' : 'none')};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    background-color: ${rgba('#000', 0.55)};
`;

export const Container = styled(animated.div)`
    position: fixed;
    left: 0;
    z-index: 10;

    display: flex;
    flex-direction: column;
    align-items: center;

    touch-action: pan-down;

    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    height: 50%;
    padding: ${({ theme }) => `${theme.spacings.xxl} ${theme.spacings.xl} ${theme.spacings.md}`};
    border-top-left-radius: ${({ theme }) => theme.radius.lg};
    border-top-right-radius: ${({ theme }) => theme.radius.lg};
    transition: bottom 0.3s ease-out;
    box-sizing: border-box;

    -webkit-overflow-scrolling: touch;

    &:before {
        content: '';
        position: absolute;
        top: 10px;
        left: calc(50% - 33% / 2);
        right: 0;
        width: 33%;
        height: 4px;
        background-color: ${({ theme }) => theme.colors.grey[600]};
        border-radius: ${({ theme }) => theme.radius.xs};
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100%;
    min-height: 100%;
    justify-content: space-between;
    box-sizing: border-box;
    overflow: auto;
`;
