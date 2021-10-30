import { useState, ReactElement, useEffect } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { addToCart } from 'services/cart';

import Modal, { ModalProps } from 'components/Modal';
import { useAppDispatch } from 'store/hooks';

import * as S from './styles';

type ProductModalProps = {
    product: Product | null;
} & ModalProps;

export default function ProductModal({
    product,
    ...modalProps
}: ProductModalProps): ReactElement {
    const intl = useIntl();
    const dispatch = useAppDispatch()

    const [quantity, setQuantity] = useState(1);
    const [finalPrice, setFinalPrice] = useState(product?.price || 0);

    function handleAddToCart(): void {
        if (product) {
            dispatch(addToCart({ ...product, quantity }))
            modalProps.onClose()
        }
    }

    useEffect(() => {
        setQuantity(product && product.quantity > 0 ? 1 : 0)
    }, [product])

    useEffect(() => {
        setFinalPrice(product ? product.price * quantity : 0);
    }, [product, quantity]);

    if (!product) {
        return <Modal {...modalProps} />
    }

    return (
        <Modal {...modalProps}>
            <S.Header>
                <S.ProductDetailsWrapper>
                    <S.ProductName>{product.name}</S.ProductName>
                    <S.ProductPrice>
                        <FormattedNumber
                            value={product.price || 0}
                            style="currency"
                            currency="EUR"
                        />
                    </S.ProductPrice>
                </S.ProductDetailsWrapper>
                <S.ProductImage src={product.image} />
            </S.Header>

            <Stack>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ mt: 3 }}>
                    <IconButton
                        size="large"
                        disabled={quantity === 1}
                        onClick={() => {
                            setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
                        }}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>

                    <S.ProductPrice>{quantity}</S.ProductPrice>

                    <IconButton
                        size="large"
                        disabled={quantity === product.quantity}
                        onClick={() => {
                            setQuantity(quantity + 1 > product.quantity ? quantity : quantity + 1);
                        }}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Stack>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, color: 'white' }}
                    onClick={() => handleAddToCart()}>
                    <FormattedMessage
                        defaultMessage="Ajouter au panier ({price})"
                        values={{
                            price: intl.formatNumber(finalPrice, {
                                style: 'currency',
                                currency: 'EUR',
                            }),
                        }}
                    />
                </Button>
            </Stack>
        </Modal>
    );
}
