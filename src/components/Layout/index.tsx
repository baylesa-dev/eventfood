import type { PropsWithChildren, ReactElement } from 'react';

import AppBar from 'components/Appbar';

import * as S from './styles';

export default function Layout({
    children,
}: PropsWithChildren<unknown>): ReactElement {
    return (
        <S.Wrapper id="wrapper">
            <S.Main>{children}</S.Main>
            <AppBar />
        </S.Wrapper>
    );
}
