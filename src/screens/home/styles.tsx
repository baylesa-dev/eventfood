import Paper from '@mui/material/Paper';
import styled from 'styled-components';

import { rgba } from 'theme/utils/rgb';

export const InputWrapper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    margin: theme.spacings.md,
    paddingLeft: theme.spacings.sm,
}));

export const ProductCard = styled.article`
    display: flex;

    &:not(:last-child) {
        position: relative;
        margin-bottom: ${({ theme }) => theme.spacings.lg};

        &:after {
            position: absolute;
            content: '';
            height: 1px;
            background-color: ${({ theme }) =>
                rgba(theme.colors.grey[200], 0.3)};
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
`;

export const ProductImage = styled.img``;

export const ProductPrice = styled.span`
    font-size: 0.7rem;
`;
