import styled from 'styled-components'

import { rgba } from 'theme/utils/rgb'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: ${({ theme }) => `${theme.spacings.md} ${theme.spacings.sm}`};
`

export const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

export const Heading = styled.h2`
    margin: 0;
`

export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-position: center;
    transition: background 0.8s;

    border-top-width: 1px;
    border-top-color: ${({ theme }) => theme.colors.grey[200]};
    border-top-style: solid;

    &:last-child {
        border-bottom-width: 1px;
        border-bottom-color: ${({ theme }) => theme.colors.grey[200]};
        border-bottom-style: solid;
    }

    padding: ${({ theme }) => theme.spacings.md} 0;

    &:active {
        background-color: ${({ theme }) => rgba(`${theme.colors.grey[400]}`, .2)};
        background-size: 100%;
        transition: background 0s;
    }
`

export const List = styled.ul`
    list-style: none;
    padding: 0;
    flex: 1;
`

export const ListHeader = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-bottom: ${({ theme }) => theme.spacings.xs};
`

export const Header = styled.span`
    font-size: ${({ theme }) => theme.fonts.sizes.xxxs};
    color: ${({ theme }) => theme.colors.grey[400]};
    font-weight: 800;
    text-transform: uppercase;
`

export const ArticleName = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
`

export const ArticlePriceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const ArticlePrice = styled.span`
    font-family: 'IBM Plex Mono';
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
`

export const ArticlePriceDetails = styled.span`
    font-family: 'IBM Plex Mono';
    color: ${({ theme }) => theme.colors.grey[400]};
    font-size: ${({ theme }) => theme.fonts.sizes.xxxs};
`

export const EmptyCart = styled.p`
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.secondary.main};
    font-weight: 600;
`

export const Alert = styled.article`
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
    padding: ${({ theme }) => `${theme.spacings.xs} ${theme.spacings.sm}`};
    border-radius: ${({ theme }) => theme.radius.xs};
    background-color: ${({ theme }) => theme.colors.critical.main};
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacings.sm};

    > svg {
        margin-right: ${({ theme }) => theme.spacings.xs};
    }
`