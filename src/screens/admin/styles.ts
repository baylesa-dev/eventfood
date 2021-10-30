import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import styledC from 'styled-components'

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const StackHeading = styledC.h3`
    margin: ${({ theme }) => `${theme.spacings.xs} ${theme.spacings.xs} ${theme.spacings.md}`};
`

export const OrderCard = styledC.article`
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.background};
    margin-bottom: ${({ theme }) => theme.spacings.xs};
    border-radius: ${({ theme }) => theme.radius.xs};
    padding: ${({ theme }) => `${theme.spacings.xs} ${theme.spacings.md}`};
`

export const OrderCardDetails = styledC.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

export const OrderCardInfo = styledC.p`
    margin: 0;
    font-size: ${({ theme }) => theme.fonts.sizes.xxs};
    font-weight: 700;
`

export const OrderCardProductsList = styledC.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

export const OrderCardProductItem = styledC.li`
font-size: ${({ theme }) => theme.fonts.sizes.xs};
`