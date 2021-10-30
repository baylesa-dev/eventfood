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
    margin: 0;
`