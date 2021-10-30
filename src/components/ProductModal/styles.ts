import styled from 'styled-components'

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacings.md};
`

export const ProductDetailsWrapper = styled.div`
    flex: 1;
    height: 70px;
    display: flex;
    flex-direction: column;
`

export const ProductName = styled.h2`
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Mulish';
`

export const ProductPrice = styled.span`
    font-family: 'IBM Plex Mono', monospace;
`

export const Divider = styled.div`
    background-color: ${({ theme }) => theme.colors.grey[400]};
    width: 100%;
    height: 1px;
    left: 0; 
    right: 0;
    margin-bottom: ${({ theme }) => theme.spacings.md};
`

export const ProductImage = styled.img`
    height: 70px;
`