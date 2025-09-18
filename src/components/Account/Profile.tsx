import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import { WhitePaper } from '../WhitePaper';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { buttonSx } from '../../styles/buttonSx';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAccount } from '../../hooks/useAccount';

export const Profile = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const { editAccount } = useAccount();
  const account = useSelector((state: RootState) => state.account.account);
  const userProfile = useSelector((state: RootState) => state.account.userProfile);

  const PROFILE = [
    {
      label: 'First Name',
      value: userProfile?.profile?.firstName ?? '',
      field: 'firstName',
    },
    {
      label: 'Last Name',
      value: userProfile?.profile?.lastName ?? '',
      field: 'lastName',
    },
    { label: 'Email', value: account?.email ?? '', field: 'email' },
    {
      label: 'Phone',
      value: userProfile?.profile?.phone ?? '',
      field: 'phone',
    },
  ];

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    onSubmit: async (values: typeof userProfile.profile) => {
      editAccount.editProfile(values);
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (userProfile.profile) {
      formik.setValues(userProfile.profile);
    }
  }, []);

  return (
    <WhitePaper>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary.main, textAlign: 'left' }}>
            Edit Your Profile
          </Typography>
          <Grid container spacing='1.5rem'>
            {PROFILE.map((item) => (
              <Grid size={6}>
                <Typography variant='subtitle1' sx={{ color: '#000', textAlign: 'left' }}>
                  {item.label}
                </Typography>
                <TextField
                  name={item.field}
                  key={item.label}
                  value={formik.values[item.field as keyof typeof formik.values]}
                  variant={isEditing && item.field !== 'email' ? 'outlined' : 'filled'}
                  fullWidth
                  InputProps={
                    isEditing && item.field !== 'email'
                      ? { disableUnderline: true }
                      : { readOnly: true, disableUnderline: true }
                  }
                  sx={{
                    '& .MuiInputBase-input': {
                      color: '#000',
                      opacity: isEditing && item.field !== 'email' ? 1 : 0.5,
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      opacity: isEditing && item.field !== 'email' ? 1 : 0.5,
                    },
                  }}
                  onChange={formik.handleChange}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1.5rem',
            }}
          >
            {isEditing ? (
              <>
                <Button
                  variant='outlined'
                  sx={buttonSx.transparent}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type='submit' variant='contained' sx={buttonSx.default}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant='contained' sx={buttonSx.default}>
                Edit
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </WhitePaper>
  );
};
