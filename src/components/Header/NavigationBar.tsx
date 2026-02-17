import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { FW } from '../../theme';
import { useSelector } from 'react-redux';
import { AccountPopUp } from '../../shared/components/AccountPopUp';
import { useState } from 'react';
import type { RootState } from '../../store/store';
import { useLogout } from '../../features/auth/hooks/useLogout';

export const NavigationBar = () => {
  const theme = useTheme();
  const account = useSelector((state: RootState) => state.auth.auth);
  const wishlist = useSelector((state: RootState) => state.userProfile.userProfile.wishlist);
  const cartItem = useSelector((state: RootState) => state.cart.cart?.item);

  const isLoggedIn = account && account.id && account.email;

  const NAVIGATION_LIST = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' },
    { label: 'About', path: '/about' },
    {
      label: isLoggedIn ? 'Log Out' : 'Sign Up',
      path: isLoggedIn ? '/' : '/signup',
    },
  ];
  const nav = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenWishlist = () => {
    nav('/account/wishlist');
  };

  const handleOpenCart = () => {
    nav('/cart');
  };

  return (
    <>
      <Box sx={{ width: '100%', color: theme.palette.grey[900], mt: 3 }}>
        <Grid container sx={{ display: 'flex', mr: '8rem', ml: '8rem' }}>
          <Grid size={3}>
            <Typography
              variant='h4'
              sx={{ fontWeight: FW.bold, '&:hover': { cursor: 'pointer' } }}
              onClick={() => nav('/')}
            >
              Exclusive
            </Typography>
          </Grid>
          <Grid
            size={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {NAVIGATION_LIST.map((item: { label: string; path: string }, index: number) => (
              <Typography
                onClick={() => {
                  if (item.label === 'Log Out') {
                    logout();
                    nav(item.path);
                  } else {
                    nav(item.path);
                  }
                }}
                key={index}
                variant='subtitle1'
                sx={{
                  margin: '0 20px',
                  cursor: 'pointer',
                  textDecoration:
                    location.pathname === item.path && item.label !== 'Log Out'
                      ? 'underline'
                      : 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Grid>
          <Grid
            size={3}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                  sx: { color: theme.palette.text.secondary, fontSize: '12px' },
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchOutlined sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                variant='standard'
                placeholder='What are you looking for?'
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
              <Badge badgeContent={wishlist?.length || 0} color='error' overlap='circular'>
                <IconButton onClick={() => handleOpenWishlist()}>
                  <FavoriteBorderOutlined sx={{ fontSize: 30, color: '#000000' }} />
                </IconButton>
              </Badge>
              <Badge badgeContent={cartItem?.length || 0} color='error' overlap='circular'>
                <IconButton onClick={() => handleOpenCart()}>
                  <ShoppingCartOutlined sx={{ fontSize: 30, color: '#000000' }} />
                </IconButton>
              </Badge>
              {isLoggedIn && (
                <>
                  <Avatar
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    src={
                      account.photoUrl
                        ? `https://images.weserv.nl/?url=${encodeURIComponent(account.photoUrl)}`
                        : undefined
                    }
                    alt={account.displayName || 'User Avatar'}
                    sx={{ width: 30, height: 30, cursor: 'pointer' }}
                  >
                    {account.displayName?.charAt(0) || ''}
                  </Avatar>
                  <AccountPopUp anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider
        sx={{
          backgroundColor: '#000000',
          opacity: 0.1,
          borderBottomWidth: 0.5,
        }}
      />
    </>
  );
};
