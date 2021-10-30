import { ReactElement } from "react";

import { FormattedMessage } from "react-intl";

import Layout from "components/Layout";

import * as S from './styles'

export default function PastOrders(): ReactElement {
    return (
        <Layout>
            <S.Wrapper>
                <S.Main>
                    <S.Heading>
                        <FormattedMessage defaultMessage="Panier" />
                    </S.Heading>
                </S.Main>
            </S.Wrapper>
        </Layout>
    )
}