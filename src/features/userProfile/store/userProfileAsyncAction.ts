import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Profile, type UserProfile } from '../../../shared/types/userProfile';
import {
  getUserService,
  updateProfileService,
  addAddressService,
  deleteAddressService,
} from '../service/userProfileService';
import { mapFirebaseError } from '../../../shared/utils/mapError';
import type { Address } from '../../../shared/types/address';

// Fetch user profile by id
const getUserProfile = createAsyncThunk<UserProfile, string, { rejectValue: string }>(
  'user/getUserProfile',
  async (id, { rejectWithValue }) => {
    try {
      return await getUserService(id);
    } catch (error) {
      return rejectWithValue(mapFirebaseError(error));
    }
  },
);

// Update user profile by id
const updateProfileAsyncAction = createAsyncThunk<
  Profile,
  { id: string; profile: Profile },
  { rejectValue: string }
>('user/updateUserProfile', async ({ id, profile }, { rejectWithValue }) => {
  try {
    return await updateProfileService(id, profile);
  } catch (error) {
    return rejectWithValue(mapFirebaseError(error));
  }
});

// Add address
const addAddressAsyncAction = createAsyncThunk<Address, { newAddress: Address }>(
  'user/addAddress',
  async ({ newAddress }, { rejectWithValue }) => {
    try {
      return await addAddressService(newAddress);
    } catch (error) {
      return rejectWithValue(mapFirebaseError(error));
    }
  },
);

// Delete address
const deleteAddressAsyncAction = createAsyncThunk<string, string, { rejectValue: string }>(
  'user/deleteAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      return await deleteAddressService(addressId);
    } catch (error) {
      return rejectWithValue(mapFirebaseError(error));
    }
  },
);

export {
  getUserProfile,
  updateProfileAsyncAction,
  addAddressAsyncAction,
  deleteAddressAsyncAction,
};
