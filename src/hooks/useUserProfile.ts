import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/auth.slice';
import type { Auth } from '../types/auth';

export const useUserProfile = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [loading] = useState(false);

  // Set initial account values
  const setInitialAccountValue = async (values: Auth) => {
    try {
      dispatch(setAuth(values));
    } catch (error) {
      console.error('Failed to set initial account values:', error);
    } finally {
      console.log('Initial account values set');
    }
  };

  // const editProfile = async (values: Profile) => {
  //   setLoading(true);
  //   try {
  //     dispatch(setProfile(values));
  //     showSnackBar?.('Profile is successfully edited', 'success');
  //   } catch {
  //     showSnackBar?.('Edit failed', 'error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const editAddressBooks = async (values: AddressBooks[]) => {
  //   setLoading(true);
  //   try {
  //     dispatch(setAddressBook(values));
  //     showSnackBar?.('Address Books are successfully edited', 'success');
  //     console.log('euy');
  //   } catch {
  //     showSnackBar?.('Edit failed', 'error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    editAccount: {
      loading,
      // editProfile,
      // editAddressBooks,
    },
    initialValue: {
      setInitialAccountValue,
    },
  };
};
