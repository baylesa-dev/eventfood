import { ChangeEvent, MouseEvent, ReactElement, useState } from "react";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useRouter } from "next/router";

import AdminAppbar from "components/AdminAppbar";

export default function AdminLogin(): ReactElement {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSave = () => {
        if (password.length && typeof window !== "undefined") {
            localStorage.setItem("secret", password);
            router.replace('/admin')
        }
    }

    return (
        <Box sx={{ flexGrow: 1, height: '100%' }}>
            <AdminAppbar />

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5 }}>
                    <Stack spacing={2}>
                        <FormControl variant="outlined">
                            <InputLabel color="secondary" htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                color="secondary"
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <Button disabled={password.length === 0} variant="contained" color="secondary" sx={{ color: 'white' }} onClick={handleSave}>
                            Valider
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    )
}