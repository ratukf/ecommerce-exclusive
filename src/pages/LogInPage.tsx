import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FW } from '../theme';
import { buttonSx } from '../styles/buttonSx';
import { useLogin } from '../features/auth/hooks/useLogin';
import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import type { RootState } from '../store/store';

export const LogInPage = () => {
  const { login } = useLogin();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login(email, password);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginY: '5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid size={6} sx={{ display: { md: 'flex', xs: 'none' } }}>
        <img src='/auth.png' alt='auth' style={{ width: '100%' }} />
      </Grid>
      <Grid
        size={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          textAlign: 'left',
          gap: '3rem',
          padding: { md: '7rem', xs: '1rem' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Typography variant='h4' sx={{ fontWeight: FW.medium }}>
            Log in to Exclusive
          </Typography>
          <Typography variant='subtitle1'>Enter your details below</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <TextField
            label='Email'
            type='email'
            variant='standard'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='Password'
            type='password'
            autoComplete='current-password'
            variant='standard'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </Box>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: '2.5rem',
          }}
        >
          <Button
            variant='contained'
            sx={buttonSx.default}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
