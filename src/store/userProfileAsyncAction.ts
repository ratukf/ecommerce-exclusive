import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserProfile } from '../services/userProfileService';

// Fetch user profile by UID
const getUserProfile = createAsyncThunk<UserProfile | null, string, { rejectValue: string }>(
  'user/getUserProfile',
  async (uid, { rejectWithValue }) => {
    try {
      const { getUser } = await import('../services/userProfileService');
      const userProfile = await getUser(uid);
      if (!userProfile) {
        return rejectWithValue('User profile not found');
      }
      return userProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue('Failed to fetch user profile');
    }
  },
);
export { getUserProfile };
