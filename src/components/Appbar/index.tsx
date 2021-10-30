import type { ReactElement } from 'react';

import { useRouter } from 'next/router';

import CartIcon from 'icons/CartIcon';
import FoodIcon from 'icons/FoodIcon';
import ReceiptIcon from 'icons/ReceiptIcon';
import SearchIcon from 'icons/SearchIcon';
import { useAppSelector } from 'store/hooks';

import * as S from './styles';

export default function AppBar(): ReactElement {
    const { push, pathname } = useRouter();
    const { elements } = useAppSelector((state) => state.cart)

    return (
        <S.Container>
            <S.Link
                key="/"
                onClick={() => push("/")}
                active={pathname === "/"}>
                <FoodIcon
                    size={20}
                    color={pathname === "/" ? 'primary.main' : 'text'}
                />
            </S.Link>
            <S.Link
                key="/search"
                onClick={() => push("/search")}
                active={pathname === "/search"}>
                <SearchIcon
                    size={20}
                    color={pathname === "/search" ? 'primary.main' : 'text'}
                />
            </S.Link>
            <S.Link
                key="/cart"
                onClick={() => push("/cart")}
                active={pathname === "/cart"}
                indicator={elements.reduce((prev, curr) => prev + curr.quantity, 0)}>
                <CartIcon
                    size={20}
                    color={pathname === "/cart" ? 'primary.main' : 'text'}
                />
            </S.Link>
            <S.Link
                key="/past-orders"
                onClick={() => push("/past-orders")}
                active={pathname === "/past-orders"}>
                <ReceiptIcon
                    size={20}
                    color={pathname === "/past-orders" ? 'primary.main' : 'text'}
                />
            </S.Link>

        </S.Container>
    );
}
