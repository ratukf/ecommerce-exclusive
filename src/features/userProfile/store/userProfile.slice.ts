import { createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';
import { getUserProfile, updateProfileAsyncAction } from './userProfileAsyncAction';
import type { UserProfileState } from '../../../shared/types/userProfile';

// Initial state for user profile slice
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
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      // Update user profile by id
      .addCase(updateProfileAsyncAction.fulfilled, (state, action) => {
        state.userProfile.profile = action.payload;
      })
      .addMatcher(isPending(getUserProfile, updateProfileAsyncAction), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejected(getUserProfile, updateProfileAsyncAction), (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Something went wrong');
      })
      .addMatcher(isFulfilled(getUserProfile, updateProfileAsyncAction), (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const userProfileReducer = userProfileSlice.reducer;
