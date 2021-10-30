import styled from 'styled-components'

export const StackHeading = styled.h3`
    margin: ${({ theme }) => `${theme.spacings.xs} ${theme.spacings.xs} ${theme.spacings.md}`};
`

export const OrderCard = styled.article`
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.background};
    margin-bottom: ${({ theme }) => theme.spacings.xs};
    border-radius: ${({ theme }) => theme.radius.xs};
    padding: ${({ theme }) => `${theme.spacings.xs} ${theme.spacings.md}`};
`

export const OrderCardDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

export const OrderCardInfo = styled.p<{ total?: boolean; red?: boolean }>`
    margin: 0;
    font-size: ${({ theme, total }) => total ? theme.fonts.sizes.xs : theme.fonts.sizes.xxs};
    font-weight: 700;
    color: ${({ red, theme, total }) => red ? theme.colors.critical.main : total ? theme.colors.primary.main : theme.colors.text};
`

export const OrderCardProductsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: ${({ theme }) => theme.spacings.xs} 0 0;
`

export const OrderCardProductItem = styled.li`
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
`

export const Divider = styled.div`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.grey[200]};
    width: 100%;
    margin: ${({ theme }) => theme.spacings.xs} 0;
`

export const OrderCardInfoPrice = styled.span`
    font-weight: 800;
`