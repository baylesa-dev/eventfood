import { ReactElement } from "react";

import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import * as S from './styles'

export default function AdminAppbar(): ReactElement {
    return (
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
    )
}