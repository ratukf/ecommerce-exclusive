import { FacebookOutlined, Instagram, LinkedIn, SendOutlined, Twitter } from "@mui/icons-material"
import { Box, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import { AppStoreButton, GooglePlayButton } from "react-mobile-app-button"

export const Footer = () => {
    const SUPPORT_LIST = [
        { label: '111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.', path: '/' },
        { label: 'exclusive@gmail.com', path: '/' },
        { label: '+88015-88888-9999', path: '/' }
    ]
    const ACCOUNT_LIST = [
        { label: 'My Account', path: '/' },
        { label: 'Login / Register', path: '/' },
        { label: 'Cart', path: '/' },
        { label: 'Wishlist', path: '/' },
        { label: 'Shop', path: '/' }
    ]
    const QUICK_LINK = [
        { label: 'Privacy Policy', path: '/' },
        { label: 'Term Of Use', path: '/' },
        { label: 'FaQ', path: '/' },
        { label: 'Contact', path: '/' }
    ]

    const tittleStyle = {
        fontWeight: 500,
        fontSize: '20px',
        marginBottom: '24px',
        fontFamily: 'Poppins, sans-serif',
    }

    const listStyle = {
        fontWeight: 400,
        fontSize: '16px',
        marginBottom: '18px',
        fontFamily: 'Poppins, sans-serif',
        color: '#ffffff',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        }
    }

    const theme = useTheme();
    return (

        <Box sx={{ width: '100%', backgroundColor: '#000000' }}>
            <Grid container spacing={10} columns={10} sx={{ fontFamily: 'Poppins, sans-serif', color: '#ffffff', paddingLeft: '8rem', paddingRight: '8rem', paddingY: '3rem' }}>
                <Grid size={2}>
                    <Typography variant="h4" sx={{ marginBottom: '24px' }}>
                        Exclusive
                    </Typography>
                    <Typography sx={{ ...tittleStyle, fontSize: '20px', fontWeight: 500 }}>
                        Subscribe
                    </Typography>
                    <Typography sx={{ ...tittleStyle, fontSize: '16px', fontWeight: 400 }}>
                        Get 10% off your first order
                    </Typography>
                    <TextField
                        placeholder="Enter your email"
                        sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ffffff',
                                },
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SendOutlined sx={{ fontSize: 20, color: '#ffffff' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ ...tittleStyle }}>
                        Support
                    </Typography>
                    {SUPPORT_LIST.map((item, index) => (
                        <Typography key={index} sx={{ ...listStyle }}>
                            {item.label}
                        </Typography>
                    ))}
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ ...tittleStyle }}>
                        Account
                    </Typography>
                    {ACCOUNT_LIST.map((item, index) => (
                        <Typography key={index} sx={{ ...listStyle }}>
                            {item.label}
                        </Typography>
                    ))}
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ ...tittleStyle }}>
                        Quick Link
                    </Typography>
                    {QUICK_LINK.map((item, index) => (
                        <Typography key={index} sx={{ ...listStyle }}>
                            {item.label}
                        </Typography>
                    ))}
                </Grid>
                <Grid size={2}>
                    <Typography sx={{ ...tittleStyle }}>
                        Download App
                    </Typography>
                    <Typography variant="caption" sx={{ ...listStyle, opacity: 0.7, marginBottom: '4px' }}>
                        Save $3 with App New User Only
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <GooglePlayButton url="/" theme="dark" />
                            <AppStoreButton url="/" theme="dark" />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <IconButton>
                            <FacebookOutlined sx={{ color: '#ffffff' }} />
                        </IconButton>
                        <IconButton>
                            <Twitter sx={{ color: '#ffffff' }} />
                        </IconButton>
                        <IconButton>
                            <Instagram sx={{ color: '#ffffff' }} />
                        </IconButton>
                        <IconButton>
                            <LinkedIn sx={{ color: '#ffffff' }} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ backgroundColor: '#ffffff', opacity: 0.3, my: 2 }} />
            <Typography sx={{ textAlign: 'center', paddingY: '1rem', fontSize: '14px', color: theme.palette.grey[50], opacity: 0.3, fontFamily: 'Poppins, sans-serif' }}>
                © Copyright Ratu 2025. All rights reserved. <br />
                Design by Rimel 2022
            </Typography>
        </Box >
    )
}