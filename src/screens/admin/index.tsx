/* eslint-disable react/no-array-index-key */
import { ReactElement, useEffect, useState } from "react";

import SearchIcon from '@mui/icons-material/Search';
import { Paper } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from "react-query";


import getOrders from "services/orders/getOrders";
import { setOrderDelivered, setOrderPaid } from "services/orders/updateOrder";

import * as S from './styles'


function not(a: readonly AdminOrder[], b: readonly AdminOrder[]) {
    return a.filter((value) => b.findIndex(({ id }) => id === value.id) === -1);
}

function intersection(a: readonly AdminOrder[], b: readonly AdminOrder[]) {
    return a.filter((value) => b.findIndex(({ id }) => id === value.id) !== -1);
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
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        EventsFood
                    </Typography>
                    <S.Search>
                        <S.SearchIconWrapper>
                            <SearchIcon />
                        </S.SearchIconWrapper>
                        <S.StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </S.Search>
                </Toolbar>
            </AppBar>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                spacing={2}
                sx={{ mt: 2, mb: 10, overflow: 'auto' }}
            >
                <Paper sx={{ width: '100%', pl: 1, pr: 1, overflow: 'auto' }}>
                    <Stack>
                        <S.StackHeading>Commandes non-payées</S.StackHeading>
                        {initial.map((value) => (
                            <S.OrderCard key={value.id}>
                                <S.OrderCardDetails>
                                    <S.OrderCardInfo>Commande n°{value.id}</S.OrderCardInfo>
                                    <S.OrderCardInfo>Commande n°{value.total}</S.OrderCardInfo>

                                    <S.OrderCardProductsList>
                                        {value.articles?.map((article, index) => <S.OrderCardProductItem key={`${value.id}-${article}-${index}`}><b>1x</b> {article}</S.OrderCardProductItem>)}
                                    </S.OrderCardProductsList>
                                </S.OrderCardDetails>
                                <Checkbox checked={checked.findIndex(({ id }) => id === value.id) !== -1} onChange={() => handleCheck(value)} />
                            </S.OrderCard>
                        ))}
                    </Stack>
                </Paper>

                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ width: '5%' }}>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        disabled={initialChecked.length === 0}
                        onClick={handleInitialToPaid}
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        disabled={paidChecked.length === 0}
                        onClick={handlePaidToInitial}
                    >
                        &lt;
                    </Button>
                </Grid>

                <Paper sx={{ width: '100%', pl: 1, pr: 1, overflow: 'auto' }}>
                    <Stack>
                        <S.StackHeading>Commandes non-servies</S.StackHeading>

                        {paid.map((value) => (
                            <S.OrderCard key={value.id}>
                                <S.OrderCardDetails>
                                    <S.OrderCardInfo>Commande n°{value.id}</S.OrderCardInfo>

                                    <S.OrderCardProductsList>
                                        {value.articles?.map((article, index) => <S.OrderCardProductItem key={`${value.id}-${article}-${index}`}><b>1x</b> {article}</S.OrderCardProductItem>)}
                                    </S.OrderCardProductsList>
                                </S.OrderCardDetails>
                                <Checkbox checked={checked.findIndex(({ id }) => id === value.id) !== -1} onChange={() => handleCheck(value)} />
                            </S.OrderCard>
                        ))}
                    </Stack>
                </Paper>

                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ width: '5%' }}>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        disabled={paidChecked.length === 0}
                        onClick={handlePaidToDelivered}
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        disabled={deliveredChecked.length === 0}
                        onClick={handleDeliveredToPaid}
                    >
                        &lt;
                    </Button>
                </Grid>

                <Paper sx={{ width: '100%', pl: 1, pr: 1, overflow: 'auto' }}>
                    <Stack>
                        <S.StackHeading>Commandes servies</S.StackHeading>

                        {delivered.map((value) => (
                            <S.OrderCard key={value.id}>
                                <S.OrderCardDetails>
                                    <S.OrderCardInfo>Commande n°{value.id}</S.OrderCardInfo>

                                    <S.OrderCardProductsList>
                                        {value.articles?.map((article, index) => <S.OrderCardProductItem key={`${value.id}-${article}-${index}`}><b>1x</b> {article}</S.OrderCardProductItem>)}
                                    </S.OrderCardProductsList>
                                </S.OrderCardDetails>
                                <Checkbox checked={checked.findIndex(({ id }) => id === value.id) !== -1} onChange={() => handleCheck(value)} />
                            </S.OrderCard>
                        ))}
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    )
}