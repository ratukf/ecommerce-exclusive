import { FieldArray, Formik, getIn } from 'formik';
import { WhitePaper } from '../WhitePaper';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { buttonSx } from '../../styles/buttonSx';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
// import { useUserProfile } from '../../hooks/useUserProfile';
import * as yup from 'yup';

export const AddressBook = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState([{ id: '', status: false }]);
  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile);
  const addressBooks = userProfile?.addressBooks ?? [];
  // const { editAccount } = useUserProfile();

  const redStar = () => {
    return <span style={{ color: 'red' }}>*</span>;
  };

  const formik = {
    initialValues: {
      addressBooks:
        addressBooks.length > 0
          ? addressBooks
          : [
              {
                id: '',
                name: '',
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
              },
            ],
    },
    validationSchema: yup.object({
      addressBooks: yup.array().of(
        yup.object({
          name: yup.string().required('Address Name is required'),
          street: yup.string().required('Street is required'),
          city: yup.string().required('City is required'),
          state: yup.string().required('State is required'),
          zipCode: yup.number().typeError('Please insert number').required('Zip Code is required'),
          country: yup.string().required('Country is required'),
        }),
      ),
    }),
  };

  const getTextFieldWidth = (label: string) => {
    switch (label) {
      case 'Street':
        return 12;
      case 'City':
      case 'Address Name':
      case 'State':
      case 'Zip Code':
      case 'Country':
      case 'Action':
        return 6;
      default:
        return 12;
    }
  };

  return (
    <WhitePaper>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
        validateOnMount
        onSubmit={() => {
          console.log('halo');
          // editAccount.editAddressBooks(values.addressBooks);
          setIsEditing((prev) => prev.map((item) => ({ ...item, status: false })));
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <FieldArray name='addressBooks'>
              {({ push, remove }) => (
                <>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                    }}
                  >
                    <Typography
                      variant='h6'
                      sx={{
                        color: theme.palette.secondary.main,
                        textAlign: 'left',
                      }}
                    >
                      Edit Your Address Book
                    </Typography>
                    <Grid container spacing='1.5rem'>
                      {formik.values.addressBooks.map((addressBook, idx) => (
                        <>
                          <Box key={addressBook.id ?? idx} sx={{ mb: 4 }}>
                            {idx > 0 && (
                              <Divider
                                sx={{
                                  marginY: '2rem',
                                  backgroundColor: '#000',
                                  opacity: 1,
                                }}
                              />
                            )}
                            <Grid container spacing='1.5rem'>
                              {/* Address Name */}
                              <Grid
                                size={getTextFieldWidth('Address Name')}
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <Typography
                                  variant='subtitle1'
                                  sx={{
                                    color: '#000',
                                    textAlign: 'left',
                                  }}
                                >
                                  Address Name {redStar()}
                                </Typography>
                                <TextField
                                  error={Boolean(
                                    getIn(formik.touched, `addressBooks.${idx}.name`) &&
                                      getIn(formik.errors, `addressBooks.${idx}.name`),
                                  )}
                                  helperText={
                                    getIn(formik.touched, `addressBooks.${idx}.name`) &&
                                    getIn(formik.errors, `addressBooks.${idx}.name`)
                                  }
                                  onBlur={formik.handleBlur}
                                  variant='filled'
                                  placeholder='Home/Office/Other'
                                  name={`addressBooks.${idx}.name`}
                                  value={getIn(formik.values, `addressBooks.${idx}.name`) ?? ''}
                                  InputProps={{
                                    readOnly: !isEditing[idx]?.status,
                                    disableUnderline: !isEditing[idx]?.status,
                                  }}
                                  fullWidth
                                  sx={{
                                    '& .MuiInputBase-input': {
                                      color: '#000',
                                      opacity: isEditing[idx]?.status ? 1 : 0.5,
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#000',
                                      opacity: isEditing[idx]?.status ? 1 : 0.5,
                                    },
                                  }}
                                  onChange={formik.handleChange}
                                />
                                <Divider
                                  sx={{
                                    marginY: '1rem',
                                    backgroundColor: '#000',
                                    opacity: 0.2,
                                  }}
                                />
                              </Grid>
                              <Grid
                                size={getTextFieldWidth('Action')}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                  gap: '1rem',
                                }}
                              >
                                {!isEditing[idx]?.status ? (
                                  <IconButton
                                    sx={{
                                      color: theme.palette.secondary.main,
                                    }}
                                    onClick={() => {
                                      formik.handleSubmit();
                                      remove(idx);
                                      setIsEditing((prev) => {
                                        const newEditing = [...prev];
                                        newEditing.splice(idx, 1);
                                        return newEditing;
                                      });
                                    }}
                                  >
                                    <Tooltip title='Delete'>
                                      <DeleteOutlineOutlined />
                                    </Tooltip>
                                  </IconButton>
                                ) : null}
                                {isEditing[idx]?.status ? (
                                  <Button
                                    type='submit'
                                    variant='contained'
                                    sx={buttonSx.default}
                                    disabled={!formik.isValid || formik.isSubmitting}
                                  >
                                    Save
                                  </Button>
                                ) : (
                                  <IconButton
                                    onClick={() => {
                                      setIsEditing((prev) => {
                                        const newEditingState = prev.map((item, i) =>
                                          i === idx
                                            ? {
                                                ...item,
                                                status: true,
                                              }
                                            : {
                                                ...item,
                                                status: false,
                                              },
                                        );
                                        return newEditingState;
                                      });
                                    }}
                                    sx={{
                                      color: theme.palette.secondary.main,
                                    }}
                                  >
                                    <Tooltip title='Edit'>
                                      <EditOutlined />
                                    </Tooltip>
                                  </IconButton>
                                )}
                              </Grid>
                              {/* Address Fields */}
                              {[
                                { label: 'Street', field: 'street' },
                                { label: 'City', field: 'city' },
                                { label: 'State', field: 'state' },
                                { label: 'Zip Code', field: 'zipCode' },
                                { label: 'Country', field: 'country' },
                              ].map((child) => (
                                <Grid
                                  size={getTextFieldWidth(child.label)}
                                  key={child.field}
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }}
                                >
                                  <Typography
                                    variant='subtitle1'
                                    sx={{
                                      color: '#000',
                                      textAlign: 'left',
                                    }}
                                  >
                                    {child.label} {redStar()}
                                  </Typography>
                                  <TextField
                                    error={Boolean(
                                      getIn(formik.touched, `addressBooks.${idx}.${child.field}`) &&
                                        getIn(formik.errors, `addressBooks.${idx}.${child.field}`),
                                    )}
                                    helperText={
                                      getIn(formik.touched, `addressBooks.${idx}.${child.field}`) &&
                                      getIn(formik.errors, `addressBooks.${idx}.${child.field}`)
                                    }
                                    onBlur={formik.handleBlur}
                                    variant='filled'
                                    name={`addressBooks.${idx}.${child.field}`}
                                    value={
                                      getIn(formik.values, `addressBooks.${idx}.${child.field}`) ??
                                      ''
                                    }
                                    InputProps={{
                                      readOnly: !isEditing[idx]?.status,
                                      disableUnderline: !isEditing[idx]?.status,
                                    }}
                                    fullWidth
                                    sx={{
                                      '& .MuiInputBase-input': {
                                        color: '#000',
                                        opacity: isEditing[idx]?.status ? 1 : 0.5,
                                      },
                                      '& .MuiInputLabel-root': {
                                        color: '#000',
                                        opacity: isEditing[idx]?.status ? 1 : 0.5,
                                      },
                                    }}
                                    multiline={child.label === 'Street'}
                                    rows={child.label === 'Street' ? 3 : 1}
                                    onChange={formik.handleChange}
                                  />
                                </Grid>
                              ))}
                              {/* Action Buttons */}
                            </Grid>
                          </Box>
                        </>
                      ))}

                      <Box
                        width='100%'
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Button
                          variant='outlined'
                          sx={buttonSx.defaultOutlined}
                          onClick={() => {
                            const newId = Date.now().toString();
                            push({
                              id: newId,
                              name: '',
                              street: '',
                              city: '',
                              state: '',
                              zipCode: '',
                              country: '',
                            });
                            setIsEditing((prev) => [
                              ...prev.map((item) => ({
                                ...item,
                                status: false,
                              })),
                              { id: newId, status: true },
                            ]);
                          }}
                        >
                          Add New Address
                        </Button>
                      </Box>
                    </Grid>
                  </Box>
                </>
              )}
            </FieldArray>
          </form>
        )}
      </Formik>
    </WhitePaper>
  );
};
