import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { FW } from "../theme"
import { buttonSx, linkSx } from "../styles/buttonSx"
import { Link } from "react-router"
import { FcGoogle } from "react-icons/fc";
import { useSnackBar } from "../hooks/useSnackBar";
import { useAuth } from "../hooks/useAuth";
import { SnackBar } from "../components/SnackBar";

export const SignUp = () => {
    const { snackBar, showSnackBar, handleClose } = useSnackBar();

    const { useSignup } = useAuth(showSnackBar);

    const {
        name,
        email,
        password,
        loading,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
        signUp
    } = useSignup;

    return (
        <Grid container spacing={2} sx={{ marginY: '5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Grid size={6} sx={{ display: { md: 'flex', xs: 'none' } }}>
                <img src="/auth.png" alt="auth" style={{ width: '100%' }} />
            </Grid>
            <Grid size={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', textAlign: 'left', gap: '3rem', padding: { md: '7rem', xs: '1rem' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Typography variant="h4" sx={{ fontWeight: FW.medium }}>
                        Create an account
                    </Typography>
                    <Typography variant="subtitle1">
                        Enter your details below
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <TextField
                        label="Name"
                        type="text"
                        variant="standard"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="standard"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={handlePasswordChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                signUp();
                            }
                        }}
                    />
                </Box>
                <Box sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '1rem' }}>
                    <Button onClick={signUp} loading={loading} variant="contained" sx={{ ...buttonSx.default, width: '100%' }} >
                        Create Account
                    </Button>
                    <Button variant="outlined" sx={{ ...buttonSx.defaultOutlined, width: '100%' }}>
                        <FcGoogle style={{ fontSize: '1.5rem', marginRight: '8px' }} />
                        Sign up with Google
                    </Button>
                    <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Typography variant="subtitle1">
                            Already have an account? <Link to="/login" style={linkSx.default}>Log in</Link>
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <SnackBar
                open={snackBar.open}
                message={snackBar.message}
                severity={snackBar.severity}
                onClose={handleClose}
            />
        </Grid >
    )
}