import { css, FlattenSimpleInterpolation } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export default function skeleton(theme: any): FlattenSimpleInterpolation {
    return css`
        background: linear-gradient(
            90deg,
            ${theme.colors.grey[100]} 25%,
            ${theme.colors.grey[200]} 37%,
            ${theme.colors.grey[100]} 63%
        );
        background-size: 400% 100%;
        animation: skeletonAnimation 1.4s ease infinite;

        @keyframes skeletonAnimation {
            0% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
    `;
}
