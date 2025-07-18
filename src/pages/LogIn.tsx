import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { FW } from "../theme"
import { buttonSx, linkSx } from "../styles/buttonSx"
import { Link } from "react-router"

export const LogIn = () => {
    return (
        <Grid container spacing={2} sx={{ marginY: '5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Grid size={6} sx={{ display: { md: 'flex', xs: 'none' } }}>
                <img src="/auth.png" alt="auth" style={{ width: '100%' }} />
            </Grid>
            <Grid size={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', textAlign: 'left', gap: '3rem', padding: { md: '7rem', xs: '1rem' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Typography variant="h4" sx={{ fontWeight: FW.medium }}>
                        Log in to Exclusive
                    </Typography>
                    <Typography variant="subtitle1">
                        Enter your details below
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <TextField
                        id="standard-search"
                        label="Email"
                        type="search"
                        variant="standard"
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                </Box>
                <Box sx={{ justifyContent: 'space-between', display: 'flex', width: '100%', alignItems: 'center', gap: '2.5rem' }}>
                    <Button variant="contained" sx={buttonSx.default}>
                        Log In
                    </Button>
                    <Link to="/register" style={linkSx.default}>
                        Forgot Password?
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}