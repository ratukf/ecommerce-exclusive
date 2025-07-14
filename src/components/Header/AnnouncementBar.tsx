import { Box, Container, IconButton, Link, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const AnnouncementBar = () => {

    const textStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
    }
    const theme = useTheme();
    return (
        <Box sx={{ width: '100%', backgroundColor: '#000000', color: theme.palette.grey[50] }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1.2 }} >
                <Typography sx={{ fontWeight: 300, ...textStyle }}>
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
                    <Link href='#' sx={{ fontWeight: 600 }}>
                        ShopNow
                    </Link>
                </Typography>
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: { xs: 'static', sm: 'absolute' },
                        right: { sm: '8rem' },
                        mt: { xs: 1, sm: 0 },
                        ...textStyle,
                    }}
                >
                    English
                    <IconButton sx={{ color: theme.palette.grey[50] }}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Typography>
            </Container>
        </Box >
    )
}