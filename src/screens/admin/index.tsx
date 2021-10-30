/* eslint-disable react/no-array-index-key */
import { ReactElement, useEffect, useState } from "react";

import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { FormattedNumber } from "react-intl";
import { useMutation, useQuery } from "react-query";


import AdminAppbar from "components/AdminAppbar";
import useAuthentication from "hooks/useAuthentication";
import getOrders from "services/orders/getOrders";
import { setOrderDelivered, setOrderPaid } from "services/orders/updateOrder";

import * as S from './styles'

type OrdersListProps = {
    title: string;
    orders: readonly AdminOrder[];
    handleCheck: (value: AdminOrder) => void;
    checked: readonly AdminOrder[];
}

type OrersListControlProps = {
    leftDisabled: boolean;
    rightDisabled: boolean;
    handleLeftToRight: () => void
    handleRightToLeft: () => void
}

function not(a: readonly AdminOrder[], b: readonly AdminOrder[]) {
    return a.filter((value) => b.findIndex(({ id }) => id === value.id) === -1);
}

function intersection(a: readonly AdminOrder[], b: readonly AdminOrder[]) {
    return a.filter((value) => b.findIndex(({ id }) => id === value.id) !== -1);
}

function OrdersListControl({ leftDisabled, rightDisabled, handleLeftToRight, handleRightToLeft }: OrersListControlProps): ReactElement {
    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ width: '5%' }}>
            <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                disabled={leftDisabled}
                onClick={handleLeftToRight}
            >
                &gt;
            </Button>
            <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                disabled={rightDisabled}
                onClick={handleRightToLeft}
            >
                &lt;
            </Button>
        </Grid>
    )
}

function OrdersList({ title, orders, handleCheck, checked }: OrdersListProps): ReactElement {
    return (
        <Paper sx={{ width: '100%', pl: 1, pr: 1, overflow: 'auto' }}>
            <Stack>
                <S.StackHeading>{title}</S.StackHeading>
                {orders.map((value) => (
                    <S.OrderCard key={value.id}>
                        <S.OrderCardDetails>
                            <S.OrderCardInfo>Commande n°{value.id}</S.OrderCardInfo>
                            <S.OrderCardProductsList>
                                {value.articles?.map((article, index) => <S.OrderCardProductItem key={`${value.id}-${article}-${index}`}><b>1x</b> {article}</S.OrderCardProductItem>)}
                            </S.OrderCardProductsList>
                            <S.Divider />
                            <S.OrderCardInfo total red={title === "Commandes non-payées"}>
                                Total:{' '}
                                <S.OrderCardInfoPrice>
                                    <FormattedNumber value={value.total} style="currency" currency="EUR" />
                                </S.OrderCardInfoPrice>
                            </S.OrderCardInfo>
                        </S.OrderCardDetails>
                        <Checkbox checked={checked.findIndex(({ id }) => id === value.id) !== -1} onChange={() => handleCheck(value)} />
                    </S.OrderCard>
                ))}
            </Stack>
        </Paper>
    )
}

export default function Admin(): ReactElement {
    const { data } = useQuery('orders', getOrders);

    const paidMutation = useMutation(setOrderPaid)
    const deliveredMutation = useMutation(setOrderDelivered)

    const [checked, setChecked] = useState<readonly AdminOrder[]>([])
    const [initial, setInitial] = useState<readonly AdminOrder[]>([])
    const [paid, setPaid] = useState<readonly AdminOrder[]>([])
    const [delivered, setDelivered] = useState<readonly AdminOrder[]>([])

    const initialChecked = intersection(checked, initial)
    const paidChecked = intersection(checked, paid)
    const deliveredChecked = intersection(checked, delivered)

    useAuthentication({ redirectTo: "/admin/login" })

    const handleCheck = (value: AdminOrder) => {
        const currentIndex = checked.findIndex(({ id }) => value.id === id)
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    const handleInitialToPaid = async () => {
        try {
            await Promise.all(
                initialChecked.map(({ id }) => paidMutation.mutateAsync(id))
            )
            setPaid(paid.concat(initialChecked));
            setInitial(not(initial, initialChecked));
            setChecked(not(checked, initialChecked));
        } catch (error) {
            console.error(error)
        }
    }

    const handlePaidToDelivered = async () => {
        try {
            await Promise.all(
                paidChecked.map(({ id }) => deliveredMutation.mutateAsync(id))
            )

            setDelivered(delivered.concat(paidChecked));
            setPaid(not(paid, paidChecked));
            setChecked(not(checked, paidChecked));
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeliveredToPaid = () => {
        setPaid(paid.concat(deliveredChecked))
        setDelivered(not(delivered, deliveredChecked))
        setChecked(not(checked, deliveredChecked))
    }

    const handlePaidToInitial = () => {
        setInitial(initial.concat(paidChecked))
        setPaid(not(paid, paidChecked))
        setChecked(not(checked, paidChecked))
    }

    const resetLocalState = () => {
        setInitial([])
        setPaid([])
        setDelivered([])
    }

    useEffect(() => {
        if (data?.length) {
            const sorted = data.reduce((prev, { ispaid, isdelivered, ...otherProps }) => {
                if (!ispaid && !isdelivered) {
                    return { ...prev, initial: [...prev.initial, { ispaid, isdelivered, ...otherProps }] }
                } if (ispaid && !isdelivered) {
                    return { ...prev, paid: [...prev.paid, { ispaid, isdelivered, ...otherProps }] }
                }

                return { ...prev, delivered: [...prev.delivered, { ispaid, isdelivered, ...otherProps }] }
            }, { initial: [], paid: [], delivered: [] } as { [key in 'initial' | 'paid' | 'delivered']: AdminOrder[] })

            setInitial(sorted.initial)
            setPaid(sorted.paid)
            setDelivered(sorted.delivered)
        } else {
            resetLocalState()
        }
    }, [data])

    return (
        <Box sx={{ flexGrow: 1, height: '100%' }}>
            <AdminAppbar />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                spacing={2}
                sx={{ mt: 2, mb: 10, overflow: 'auto', p: 1 }}
            >
                <OrdersList title="Commandes non-payées"
                    orders={initial}
                    checked={checked}
                    handleCheck={handleCheck}
                />

                <OrdersListControl leftDisabled={initialChecked.length === 0}
                    rightDisabled={paidChecked.length === 0}
                    handleLeftToRight={handleInitialToPaid}
                    handleRightToLeft={handlePaidToInitial}
                />

                <OrdersList title="Commandes non-servies"
                    orders={paid}
                    checked={checked}
                    handleCheck={handleCheck}
                />

                <OrdersListControl leftDisabled={paidChecked.length === 0}
                    rightDisabled={deliveredChecked.length === 0}
                    handleLeftToRight={handlePaidToDelivered}
                    handleRightToLeft={handleDeliveredToPaid}
                />

                <OrdersList title="Commandes servies"
                    orders={delivered}
                    checked={checked}
                    handleCheck={handleCheck}
                />
            </Stack>
        </Box>
    )
}