import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import { WhitePaper } from '../../../shared/components/WhitePaper';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { buttonSx } from '../../../styles/buttonSx';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useAppSelector } from '../../../store/hooks';
import { Loading } from '../../../shared/components/Loading';
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile';
import { useUpdateAuth } from '../../auth/hooks/useUpdateAuth';
import * as yup from 'yup';

export const ProfileComponent = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  // Hooks
  const { updateAuth } = useUpdateAuth();
  const { updateUserProfile } = useUpdateUserProfile();

  // State
  const id = useSelector((state: RootState) => state.userProfile.userProfile?.id);
  const profile = useSelector((state: RootState) => state.userProfile.userProfile?.profile);
  const { asyncState } = useAppSelector((state: RootState) => state.userProfile);

  // Profile values
  const PROFILE = [
    {
      label: 'Name',
      value: profile.displayName,
      field: 'displayName',
    },
    { label: 'Email', value: profile.email, field: 'email' },
    {
      label: 'Phone',
      value: profile?.phone ?? '',
      field: 'phone',
    },
  ];

  const redStar = () => {
    return <span style={{ color: 'red' }}>*</span>;
  };

  // Form handler
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: profile.displayName,
      email: profile.email,
      phone: profile.phone,
    },
    validationSchema: yup.object({
      displayName: yup.string().required('Name is required'),
    }),
    onSubmit: async () => {
      setIsEditing(false);
      updateAuth(formik.values.displayName);
      updateUserProfile(id, formik.values);
    },
  });

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
          {asyncState.getUserProfile.status === 'loading' ? (
            <Loading />
          ) : (
            <>
              <Typography
                variant='h6'
                sx={{ color: theme.palette.secondary.main, textAlign: 'left' }}
              >
                Edit Your Profile
              </Typography>
              <Grid container spacing='1.5rem'>
                {PROFILE.map((item) => (
                  <Grid size={6}>
                    <Typography variant='subtitle1' sx={{ color: '#000', textAlign: 'left' }}>
                      {item.label}
                      {item.field === 'displayName' && redStar()}
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
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched[item.field as keyof typeof formik.touched] &&
                        Boolean(formik.errors[item.field as keyof typeof formik.errors])
                      }
                      helperText={
                        formik.touched[item.field as keyof typeof formik.touched] &&
                        formik.errors[item.field as keyof typeof formik.errors]
                      }
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
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant='contained'
                    sx={buttonSx.default}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </form>
    </WhitePaper>
  );
};
