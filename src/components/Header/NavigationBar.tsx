import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

export const NavigationBar = () => {
    const theme = useTheme();
    const NAVIGATION_LIST = [
        { label: 'Home', path: '/' },
        { label: 'Contact', path: '/' },
        { label: 'About', path: '/' },
        { label: 'Sign Up', path: '/' }
    ]
    return (
        <>
            <Box sx={{ width: '100%', color: theme.palette.grey[900], mt: 3 }}>
                <Grid container sx={{ display: 'flex', mr: '8rem', ml: '8rem' }}>
                    <Grid size={3}>
                        <Typography variant='h1' sx={{ '&:hover': { cursor: 'pointer' } }}>
                            Exclusive
                        </Typography>
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {NAVIGATION_LIST.map((item, index) => (
                            <Typography
                                key={index}
                                variant='body1'
                                sx={{ margin: '0 20px', cursor: 'pointer', fontSize: '16px', '&:hover': { textDecoration: 'underline' } }}
                            >
                                {item.label}
                            </Typography>
                        ))}
                    </Grid>
                    <Grid size={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { color: theme.palette.text.secondary, fontSize: '12px' },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchOutlined sx={{ fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                placeholder="What are you looking for?"
                                sx={{
                                    backgroundColor: theme.palette.secondary.dark,
                                    borderRadius: 1,
                                    '& .MuiInputBase-input::placeholder': {
                                        color: theme.palette.text.secondary,
                                        opacity: 1,
                                        fontFamily: 'Poppins, sans-serif',
                                    },
                                    color: theme.palette.text.secondary,
                                    fontSize: '12px',
                                    padding: '8px 12px',
                                    minWidth: 180,
                                }}
                            />
                            <IconButton>
                                <FavoriteBorderOutlined sx={{ fontSize: 30, color: '#000000' }} />
                            </IconButton>
                            <IconButton>
                                <ShoppingCartOutlined sx={{ fontSize: 30, color: '#000000' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
            <Divider sx={{ color: '#000000', opacity: '30%', borderBottomWidth: 0.5 }} />
        </>
    )
}