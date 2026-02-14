import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile, updateProfileAsyncAction } from './userProfileAsyncAction';
import type { UserProfileState } from '../types/userProfile';

const initialUserProfile: UserProfileState = {
  userProfile: {
    id: '',
    profile: {
      displayName: '',
      email: '',
      phone: '',
    },
    addressBooks: [],
    orders: [],
    wishlist: [],
  },
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: initialUserProfile,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get user profile by id
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to fetch user profile';
      })
      // Update user profile by id
      .addCase(updateProfileAsyncAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsyncAction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to update user profile';
      })
      .addCase(updateProfileAsyncAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userProfile.profile = action.payload;
      });
  },
});

export const userProfileReducer = userProfileSlice.reducer;
