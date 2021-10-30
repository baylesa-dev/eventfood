import styled from 'styled-components'

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
    margin: 0 0 ${({ theme }) => theme.spacings.md};
`

export const OrderCard = styled.article`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.md}`};
    border-radius: ${({ theme }) => theme.radius.sm};
    background-color: ${({ theme }) => theme.colors.background};
`

export const OrdersList = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacings.md};

    > ${OrderCard} + ${OrderCard} {
        margin-top: ${({ theme }) => theme.spacings.md};
    }
`

export const CardHeading = styled.p`
    margin: 0;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
    color: ${({ theme }) => theme.colors.primary.main};
`

export const CardArticles = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

export const CardArticle = styled.li<{ total?: boolean }>`
    display: flex;
    justify-content: space-between;
    margin-top: ${({ theme, total }) => total ? theme.spacings.md : theme.spacings.xxs};
    font-size: ${({ theme }) => theme.fonts.sizes.xs};

    > span {
        font-weight: 700;
        margin-left: ${({ theme }) => theme.spacings.xs};
        font-family: 'IBM Plex Mono';
    }
`

export const Status = styled.span<{ status: "valid" | "waiting" }>`
    padding: ${({ theme }) => `${theme.spacings.xxxs} ${theme.spacings.xs}`};
    background-color: ${({ theme, status }) => status === "valid" ? theme.colors.success.main : theme.colors.warning.main};
    color: ${({ theme, status }) => status === "valid" ? theme.colors.background : theme.colors.text};
    border-radius: ${({ theme }) => theme.radius.xs};
    font-weight: 700;
`

export const StatusWrapper = styled.section`
    display: flex;
    justify-content: flex-end;

    > ${Status} + ${Status} {
        margin-left: ${({ theme }) => theme.spacings.sm};
    }
`

export const Divider = styled.section`
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.grey[100]};
    margin: ${({ theme }) => theme.spacings.xs} 0;
`