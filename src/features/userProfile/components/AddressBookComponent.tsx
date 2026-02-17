import { FieldArray, Formik } from 'formik';
import { WhitePaper } from '../../../shared/components/WhitePaper';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { buttonSx } from '../../../styles/buttonSx';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import * as yup from 'yup';
import { useAddress } from '../hooks/useAddress';
import { emptyAddress, type Address } from '../../../shared/types/address';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';
import { Loading } from '../../../shared/components/Loading';
import { getFieldProps } from '../../../shared/utils/fieldProps';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';

export const AddressBookComponent = () => {
  const theme = useTheme();

  // Reducer
  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile);
  const { asyncState } = useAppSelector((state: RootState) => state.userProfile);

  // Hooks
  const { addAddress, deleteAddress, updateAddress } = useAddress();

  // State
  const [editingId, setEditingId] = useState('');
  const [deletingId, setDeletingId] = useState('');

  const redStar = () => {
    return <span style={{ color: 'red' }}>*</span>;
  };

  // Save new or updated address
  const handleSaveAddress = async (address: Address) => {
    if (!editingId) {
      await addAddress({ ...address, id: Date.now().toString() });
    } else {
      await updateAddress(editingId, address);
    }
    setEditingId('');
  };

  // Delete addres
  const handleDeleteAddress = async (deletingId: string) => {
    await deleteAddress(deletingId);
    setDeletingId('');
  };

  // Textfield width configuration
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
    <>
      <WhitePaper>
        <Formik
          initialValues={{
            addressBooks: userProfile.addressBooks?.length
              ? userProfile.addressBooks
              : [emptyAddress],
          }}
          enableReinitialize
          validationSchema={yup.object({
            addressBooks: yup.array().of(
              yup.object({
                name: yup.string().required('Address Name is a required field'),
                street: yup.string().required('Street is a required field'),
                city: yup.string().required('City is a required field'),
                state: yup.string().required('State is a required field'),
                zipCode: yup.string().required('Zip Code is a required field'),
                country: yup.string().required('Country is a required field'),
              }),
            ),
          })}
          onSubmit={() => {}}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
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
                  {asyncState.getUserProfile.status === 'loading' ? (
                    <Loading />
                  ) : (
                    <FieldArray
                      name='addressBooks'
                      render={({ push }) => (
                        <>
                          {formik.values.addressBooks.map((address, idx) => (
                            <Box key={address.id} sx={{ mb: 4 }}>
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
                                {/* ====================================================== */}
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
                                      textAlign: 'left',
                                    }}
                                  >
                                    Address Name {redStar()}
                                  </Typography>
                                  <TextField
                                    {...getFieldProps({
                                      formik,
                                      name: `addressBooks.${idx}.name`,
                                      placeholder: 'Home/Office/Other',
                                    })}
                                  />
                                  <Divider
                                    sx={{
                                      marginY: '1rem',
                                      backgroundColor: '#000',
                                      opacity: 0.2,
                                    }}
                                  />
                                </Grid>

                                {/* ====================================================== */}
                                {/* Delete & Edit Button */}
                                <Grid
                                  size={getTextFieldWidth('Action')}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    gap: '1rem',
                                  }}
                                >
                                  {!(
                                    editingId === address.id ||
                                    !userProfile.addressBooks.some(
                                      (addr) => addr.id === address.id && addr.name !== '',
                                    )
                                  ) ? (
                                    <IconButton
                                      onClick={() => setDeletingId(address.id)}
                                      sx={{
                                        color: theme.palette.secondary.main,
                                      }}
                                    >
                                      <Tooltip title='Delete'>
                                        <DeleteOutlineOutlined />
                                      </Tooltip>
                                    </IconButton>
                                  ) : null}
                                  {editingId === address.id ||
                                  !userProfile.addressBooks.some(
                                    (addr) => addr.id === address.id && addr.name !== '',
                                  ) ? (
                                    <>
                                      {asyncState.deleteAddress.status === 'loading' && (
                                        <IconButton>
                                          <CircularProgress color='error' />
                                        </IconButton>
                                      )}
                                      {asyncState.addAddress.status === 'loading' ||
                                      asyncState.updateAddress.status === 'loading' ? (
                                        <IconButton>
                                          <CircularProgress color='error' />
                                        </IconButton>
                                      ) : (
                                        <Button
                                          type='button'
                                          onClick={async () => {
                                            const newAddress = address;
                                            const errors = await formik.validateForm();
                                            if (Object.keys(errors).length === 0) {
                                              handleSaveAddress(newAddress);
                                            } else {
                                              const touchedFields = {
                                                ...formik.touched,
                                                addressBooks: formik.values.addressBooks.map(
                                                  (_, i) =>
                                                    i === idx
                                                      ? {
                                                          name: true,
                                                          street: true,
                                                          city: true,
                                                          state: true,
                                                          zipCode: true,
                                                          country: true,
                                                        }
                                                      : formik.touched.addressBooks?.[i] || {},
                                                ),
                                              };
                                              formik.setTouched(touchedFields, true);
                                            }
                                          }}
                                          sx={buttonSx.default}
                                          variant='contained'
                                        >
                                          Save
                                        </Button>
                                      )}
                                    </>
                                  ) : (
                                    <IconButton
                                      onClick={() => {
                                        setEditingId(address.id);
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

                                {/* ====================================================== */}
                                {/* Address's details field */}
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
                                        textAlign: 'left',
                                      }}
                                    >
                                      {child.label} {redStar()}
                                    </Typography>
                                    <TextField
                                      {...getFieldProps({
                                        formik,
                                        name: `addressBooks.${idx}.${child.field}`,
                                        placeholder: child.label,
                                      })}
                                      multiline={child.label === 'Street'}
                                      rows={child.label === 'Street' ? 3 : 1}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          ))}

                          {/* ====================================================== */}
                          {/* Action Button */}
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
                                push(emptyAddress);
                              }}
                            >
                              Add New Address
                            </Button>
                          </Box>
                        </>
                      )}
                    />
                  )}
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </WhitePaper>

      {/* ====================================================== */}
      {/* Pop up modal */}
      <ConfirmationModal
        loading={asyncState.deleteAddress.status === 'loading'}
        open={deletingId ? true : false}
        onClose={() => setDeletingId('')}
        onSubmit={() => handleDeleteAddress(deletingId)}
      />
    </>
  );
};
