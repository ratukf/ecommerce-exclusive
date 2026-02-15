import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Profile, type UserProfile } from '../../../shared/types/userProfile';
import {
  saveAddressBooksService,
  getUserService,
  updateProfileService,
} from '../service/userProfileService';
import { mapFirebaseError } from '../../../shared/utils/mapError';
import type { AddressBooks } from '../../../shared/types/address';

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

// Add adress
const saveAddressBooksAsyncAction = createAsyncThunk<
  AddressBooks,
  { id: string; addressBooks: AddressBooks },
  { rejectValue: string }
>('user/addAddress', async ({ id, addressBooks }, { rejectWithValue }) => {
  try {
    return await saveAddressBooksService(id, addressBooks);
  } catch (error) {
    return rejectWithValue(mapFirebaseError(error));
  }
});

export { getUserProfile, updateProfileAsyncAction, saveAddressBooksAsyncAction };
