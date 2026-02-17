import { FacebookOutlined, Instagram, LinkedIn, SendOutlined, Twitter } from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FW } from '../../theme';

export const Footer = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const SUPPORT_LIST = [
    { label: '111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.', path: null },
    { label: 'exclusive@gmail.com', path: null },
    { label: '+88015-88888-9999', path: null },
  ];
  const ACCOUNT_LIST = [
    { label: 'My Account', path: '/account/profile' },
    { label: 'Login / Register', path: '/signup' },
    { label: 'Cart', path: '/cart' },
    { label: 'Wishlist', path: '/account/wishlist' },
    { label: 'Shop', path: '/products' },
  ];
  const QUICK_LINK = [
    { label: 'Privacy Policy', path: '/' },
    { label: 'Term Of Use', path: '/' },
    { label: 'FaQ', path: '/' },
    { label: 'Contact', path: '/contact' },
  ];

  const listStyle = (hasPath: boolean) => ({
    marginBottom: '18px',
    cursor: hasPath ? 'pointer' : 'default',
    '&:hover': hasPath ? { textDecoration: 'underline' } : {},
  });

  return (
    <Box sx={{ width: '100%', backgroundColor: '#000000' }}>
      <Grid
        container
        spacing={10}
        columns={10}
        sx={{
          fontFamily: 'Poppins, sans-serif',
          color: '#ffffff',
          paddingLeft: '8rem',
          paddingRight: '8rem',
          paddingY: '3rem',
        }}
      >
        {/* Subscribe section */}
        <Grid size={2}>
          <Typography variant='h4' sx={{ marginBottom: '1rem' }}>
            Exclusive
          </Typography>
          <Typography variant='h6' sx={{ marginBottom: '1rem' }}>
            Subscribe
          </Typography>
          <Typography sx={{ marginBottom: '1rem' }}>Get 10% off your first order</Typography>
          <TextField
            placeholder='Enter your email'
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ffffff' },
                '&:hover fieldset': { borderColor: '#ffffff' },
                '&.Mui-focused fieldset': { borderColor: '#ffffff' },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SendOutlined sx={{ fontSize: 20, color: '#ffffff' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Support section */}
        <Grid size={2}>
          <Typography variant='h6' sx={{ marginBottom: '1.5rem', fontWeight: FW.semiBold }}>
            Support
          </Typography>
          {SUPPORT_LIST.map((item, index) => (
            <Typography
              key={index}
              sx={listStyle(!!item.path)}
              variant='inherit'
              onClick={() => item.path && navigate(item.path)}
            >
              {item.label}
            </Typography>
          ))}
        </Grid>

        {/* Account section */}
        <Grid size={2}>
          <Typography variant='h6' sx={{ marginBottom: '1.5rem', fontWeight: FW.semiBold }}>
            Account
          </Typography>
          {ACCOUNT_LIST.map((item, index) => (
            <Typography
              key={index}
              sx={listStyle(!!item.path)}
              variant='inherit'
              onClick={() => item.path && navigate(item.path)}
            >
              {item.label}
            </Typography>
          ))}
        </Grid>

        {/* Quick link section */}
        <Grid size={2}>
          <Typography variant='h6' sx={{ marginBottom: '1.5rem', fontWeight: FW.semiBold }}>
            Quick Link
          </Typography>
          {QUICK_LINK.map((item, index) => (
            <Typography
              key={index}
              sx={listStyle(!!item.path)}
              variant='inherit'
              onClick={() => item.path && navigate(item.path)}
            >
              {item.label}
            </Typography>
          ))}
        </Grid>

        {/* Download section */}
        <Grid size={2}>
          <Typography variant='h6' sx={{ marginBottom: '1.5rem', fontWeight: FW.semiBold }}>
            Download App
          </Typography>
          <Typography
            variant='caption'
            sx={{ opacity: 0.7, marginBottom: '4px', display: 'block' }}
          >
            Save $3 with App New User Only
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            {/* Google Play */}
            <Box
              component='a'
              href='javascript:void(0)'
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                backgroundColor: '#000',
                border: '1px solid #fff',
                borderRadius: 1.5,
                px: 2,
                py: 1,
                textDecoration: 'none',
                color: '#fff',
                width: 160,
                '&:hover': { backgroundColor: '#1a1a1a' },
              }}
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg'
                alt='Google Play'
                style={{ width: 24, height: 24 }}
              />
              <Box>
                <Typography sx={{ fontSize: 9, opacity: 0.8, lineHeight: 1 }}>GET IT ON</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                  Google Play
                </Typography>
              </Box>
            </Box>

            {/* App Store */}
            <Box
              component='a'
              href='javascript:void(0)'
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                backgroundColor: '#000',
                border: '1px solid #fff',
                borderRadius: 1.5,
                px: 2,
                py: 1,
                textDecoration: 'none',
                color: '#fff',
                width: 160,
                '&:hover': { backgroundColor: '#1a1a1a' },
              }}
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
                alt='App Store'
                style={{ width: 20, height: 24, filter: 'invert(1)' }}
              />
              <Box>
                <Typography sx={{ fontSize: 9, opacity: 0.8, lineHeight: 1 }}>
                  Download on the
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                  App Store
                </Typography>
              </Box>
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
      <Typography
        sx={{
          textAlign: 'center',
          paddingY: '1rem',
          fontSize: '14px',
          color: theme.palette.grey[50],
          opacity: 0.3,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        © Copyright Ratu 2025. All rights reserved. <br />
        Design by Rimel 2022
      </Typography>
    </Box>
  );
};
