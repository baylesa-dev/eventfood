import { ReactElement } from "react";

import { FormattedMessage, FormattedNumber } from "react-intl";
import { useQuery } from "react-query";

import Layout from "components/Layout";
import getOrder from "services/orders/getOrder";
import { useAppSelector } from "store/hooks";

import * as S from './styles'


function OrderCard({ id, products, time, promoCode }: Order): ReactElement {
    const { data } = useQuery(['orders', id], () => getOrder(id))


    console.log(data)

    return (
        <S.OrderCard>
            <S.CardHeading>
                <FormattedMessage defaultMessage="Commande n°{id}" values={{ id }} />
            </S.CardHeading>

            <S.Divider />

            <S.CardArticles>
                {products.map(({ articleid, name, quantity, price }) => (
                    <S.CardArticle key={articleid}>
                        {name}
                        <span>
                            {quantity} x {' '}
                            <FormattedNumber value={price} currency="EUR" style="currency" />
                        </span>
                    </S.CardArticle>
                ))}

                {products.length &&
                    <S.CardArticle total>
                        <b><FormattedMessage defaultMessage="Total" /></b>
                        <span>
                            <FormattedNumber value={data?.total || 0} currency="EUR" style="currency" />
                        </span>
                    </S.CardArticle>
                }
            </S.CardArticles>

            <S.Divider />

            <S.StatusWrapper>
                <S.Status status={data?.ispaid ? "valid" : "waiting"}>
                    {data?.ispaid ? <FormattedMessage defaultMessage="Réglée" /> : <FormattedMessage defaultMessage="Non réglée" />}
                </S.Status>
                <S.Status status={data?.isdelivered ? "valid" : "waiting"}>
                    {data?.isdelivered ? <FormattedMessage defaultMessage="Servie" /> : <FormattedMessage defaultMessage="Non servie" />}
                </S.Status>
            </S.StatusWrapper>

        </S.OrderCard>
    )
}

export default function PastOrders(): ReactElement {
    const { orders } = useAppSelector((state) => state.orders)

    console.log(orders)

    return (
        <Layout>
            <S.Wrapper>
                <S.Main>
                    <S.Heading>
                        <FormattedMessage defaultMessage="Commandes" />
                    </S.Heading>

                    <S.OrdersList>
                        {orders.map(({ id, ...otherProps }) => <OrderCard key={id} id={id} {...otherProps} />)}
                    </S.OrdersList>
                </S.Main>
            </S.Wrapper>
        </Layout>
    )
}