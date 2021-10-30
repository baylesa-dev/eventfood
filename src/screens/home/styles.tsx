import Paper from '@mui/material/Paper';
import styled, { css } from 'styled-components';

import { rgba } from 'theme/utils/rgb';

export const InputWrapper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    margin: theme.spacings.md,
    paddingLeft: theme.spacings.sm,
}));

export const ProductCard = styled.article<{ disabled: boolean }>`
    display: flex;

    ${({ disabled }) => disabled && css`
        touch-action: none;
        pointer-events: none;
        color: ${({ theme }) => rgba(theme.colors.grey[200], 1)};
    `}

    &:not(:last-child) {
        position: relative;
        margin-bottom: ${({ theme }) => theme.spacings.lg};

        &:after {
            position: absolute;
            content: '';
            height: 1px;
            background-color: ${({ theme }) => rgba(theme.colors.grey[200], 0.3)};
            width: 100%;
            bottom: -${({ theme }) => theme.spacings.sm};
        }
    }
`;

export const ProductDetails = styled.div`
    flex: 1;
`;

export const ProductName = styled.p`
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const ProductSoldOut = styled.span`
    background-color: ${({ theme }) => rgba(theme.colors.critical.main, .5)};
    border-radius: ${({ theme }) => theme.radius.xs};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fonts.sizes.xxxs};
    margin-left: ${({ theme }) => theme.spacings.xs};
    padding: ${({ theme }) => `1px ${theme.spacings.xxs}`};
`

export const ProductImage = styled.img``;

export const ProductPrice = styled.span`
    font-size: 0.7rem;
`;
