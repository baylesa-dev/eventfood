import { Fragment, MouseEvent, ReactElement, useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation } from "react-query";


import { emptyCart, removeFromCart } from "services/cart";
import { addNewOrder } from "services/orders";

import Layout from "components/Layout";
import postOrder from "services/orders/postOrder";
import { useAppDispatch, useAppSelector } from "store/hooks";

import * as S from './styles'

export default function CartScreen(): ReactElement {
    const intl = useIntl()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { elements } = useAppSelector((state) => state.cart)
    const mutation = useMutation(postOrder)
    const [mutationError, setMutationError] = useState(false)

    const [anchorEl, setAnchorEl] = useState<HTMLLIElement | null>(null);

    const handlePopover = (event: MouseEvent<HTMLLIElement>): void => {
        setAnchorEl(event.currentTarget)
    }

    const handleClosePopover = (): void => {
        setAnchorEl(null);
    };

    const handleTrashClick = (): void => {
        if (anchorEl) {
            dispatch(removeFromCart(anchorEl.id))
            setAnchorEl(null)
        }
    }

    const handleOrdering = async (): Promise<void> => {
        try {
            const { data: id } = await mutation.mutateAsync({ products: elements })
            dispatch(addNewOrder({ id: id as number, products: elements }))
            dispatch(emptyCart())
            router.push('/past-orders')
        } catch (error) {
            setMutationError(true)

            setTimeout(() => { setMutationError(false) }, 4000)
        }
    }

    useEffect(() => {
        if (anchorEl) setTimeout(() => { setAnchorEl(null) }, 1500)
    }, [anchorEl])

    return (
        <Fragment>
            <Layout>
                <S.Wrapper>
                    <S.Main>
                        <S.Heading>
                            <FormattedMessage defaultMessage="Panier" />
                        </S.Heading>


                        <S.List>
                            <S.ListHeader>
                                <S.Header>
                                    <FormattedMessage defaultMessage="Article" />
                                </S.Header>

                                <S.Header>
                                    <FormattedMessage defaultMessage="Prix" />
                                </S.Header>
                            </S.ListHeader>

                            {elements.length === 0 &&
                                <S.EmptyCart>
                                    <FormattedMessage defaultMessage="Aucun article sélectionné" />
                                </S.EmptyCart>
                            }

                            {elements.map(({ articleid, name, price, quantity }) => (
                                <S.ListItem key={articleid} onClick={handlePopover} id={articleid}>
                                    <S.ArticleName>{name}</S.ArticleName>

                                    <S.ArticlePriceWrapper>
                                        <S.ArticlePrice>{intl.formatNumber(price * quantity, { style: 'currency', currency: 'EUR' })}</S.ArticlePrice>
                                        <S.ArticlePriceDetails>{quantity} x {intl.formatNumber(price, { style: 'currency', currency: 'EUR' })}</S.ArticlePriceDetails>
                                    </S.ArticlePriceWrapper>
                                </S.ListItem>
                            ))}
                        </S.List>

                        {mutationError &&
                            <S.Alert>
                                <ErrorOutlineIcon />
                                <FormattedMessage defaultMessage="Impossible de passer la commande pour le moment." />
                            </S.Alert>
                        }

                    </S.Main>


                    <Button
                        fullWidth
                        size="medium"
                        color="primary"
                        variant="contained"
                        sx={{ color: "white" }}
                        disabled={elements.length === 0}
                        onClick={handleOrdering}>
                        {mutation.isLoading ? <CircularProgress /> : <FormattedMessage defaultMessage="Passer commande" />}
                    </Button>

                    {elements.length > 0 &&
                        <Button
                            fullWidth
                            size="small"
                            color="error"
                            variant="text"
                            sx={{ textDecoration: "underline", fontSize: '0.7rem', mt: '0.5rem' }}
                            onClick={() => dispatch(emptyCart())}>
                            <FormattedMessage
                                defaultMessage="Vider le panier"
                            />
                        </Button>
                    }
                </S.Wrapper>
            </Layout>
            <Popover
                id={anchorEl ? 'simple-popover' : undefined}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <IconButton size="medium" onClick={handleTrashClick}>
                    <DeleteIcon color="error" />
                </IconButton>
            </Popover>
        </Fragment>
    )
}
