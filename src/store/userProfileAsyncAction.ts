import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Profile, type UserProfile } from '../types/userProfile';

// Fetch user profile by id
const getUserProfile = createAsyncThunk<UserProfile, string, { rejectValue: string }>(
  'user/getUserProfile',
  async (id, { rejectWithValue }) => {
    try {
      const { getUser } = await import('../services/userProfileService');
      const result = await getUser(id);
      return result;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue('Failed to fetch user profile');
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
    const { updateProfile } = await import('../services/userProfileService');
    const result = await updateProfile(id, profile);
    return result;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return rejectWithValue('Failed to update user profile');
  }
});

export { getUserProfile, updateProfileAsyncAction };
