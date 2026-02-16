import { createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';
import {
  addAddressAsyncAction,
  deleteAddressAsyncAction,
  getUserProfile,
  updateAddressAsyncAction,
  updateProfileAsyncAction,
} from './userProfileAsyncAction';
import type { UserProfileState } from '../../../shared/types/userProfile';
import { emptyAddress } from '../../../shared/types/address';

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
    addEmptyAddressReducer: (state) => {
      state.userProfile.addressBooks.push(emptyAddress);
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
      // Delete address
      .addCase(deleteAddressAsyncAction.fulfilled, (state, action) => {
        console.log('🚀 ~ deleteAddressAsyncAction.fulfilled:', deleteAddressAsyncAction.fulfilled);
        state.userProfile.addressBooks = state.userProfile.addressBooks.filter(
          (a) => a.id !== action.payload,
        );
      })
      // Update address
      .addCase(updateAddressAsyncAction.fulfilled, (state, action) => {
        const updatedAddress = action.payload;
        state.userProfile.addressBooks = state.userProfile.addressBooks.map((address) =>
          address.id === updatedAddress.id ? updatedAddress : address,
        );
      })
      .addMatcher(
        isPending(
          getUserProfile,
          updateProfileAsyncAction,
          addAddressAsyncAction,
          deleteAddressAsyncAction,
          updateAddressAsyncAction,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isRejected(
          getUserProfile,
          updateProfileAsyncAction,
          addAddressAsyncAction,
          deleteAddressAsyncAction,
          updateAddressAsyncAction,
        ),
        (state, action) => {
          state.loading = false;
          state.error =
            typeof action.payload === 'string'
              ? action.payload
              : (action.error.message ?? 'Something went wrong');
        },
      )
      .addMatcher(
        isFulfilled(
          getUserProfile,
          updateProfileAsyncAction,
          addAddressAsyncAction,
          deleteAddressAsyncAction,
          updateAddressAsyncAction,
        ),
        (state) => {
          state.loading = false;
          state.error = null;
        },
      );
  },
});

export const userProfileReducer = userProfileSlice.reducer;
export const { addEmptyAddressReducer } = userProfileSlice.actions;
