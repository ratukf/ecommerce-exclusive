import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  getUserProfile,
  saveAddressBooksAsyncAction,
  updateProfileAsyncAction,
} from './userProfileAsyncAction';
import type { UserProfileState } from '../../../shared/types/userProfile';
import { emptyAddress, type Address } from '../../../shared/types/address';

// Initial state for user profile slice
const initialUserProfile: UserProfileState = {
  userProfile: {
    id: '',
    profile: {
      displayName: '',
      email: '',
      phone: '',
    },
    addressBooks: [emptyAddress],
    orders: [],
    wishlist: [],
  },
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: initialUserProfile,
  reducers: {
    saveAddressReducer: (state, action: PayloadAction<Address>) => {
      state.userProfile.addressBooks.push(action.payload);
    },
  },
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
      // Add new address
      .addCase(saveAddressBooksAsyncAction.fulfilled, (state, action) => {
        state.userProfile.addressBooks = action.payload;
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
export const { saveAddressReducer } = userProfileSlice.actions;
