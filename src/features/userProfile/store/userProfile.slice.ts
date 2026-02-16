import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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
  asyncState: {
    getUserProfile: { status: 'idle', error: null },
    updateProfile: { status: 'idle', error: null },
    addAddress: { status: 'idle', error: null },
    deleteAddress: { status: 'idle', error: null },
    updateAddress: { status: 'idle', error: null },
  },
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: initialUserProfile,
  reducers: {
    addEmptyAddressReducer: (state) => {
      state.userProfile.addressBooks.push(emptyAddress);
    },
    resetAsyncState: (state, action: PayloadAction<keyof typeof state.asyncState>) => {
      state.asyncState[action.payload] = {
        status: 'idle',
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      /*
      =========================
      GET USER PROFILE
      =========================
      */
      .addCase(getUserProfile.pending, (state) => {
        state.asyncState.getUserProfile.status = 'loading';
        state.asyncState.getUserProfile.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.asyncState.getUserProfile.status = 'succeeded';
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.asyncState.getUserProfile.status = 'failed';
        state.asyncState.getUserProfile.error = action.error.message ?? 'Something went wrong';
      })

      /*
      =========================
      UPDATE PROFILE
      =========================
      */
      .addCase(updateProfileAsyncAction.pending, (state) => {
        state.asyncState.updateProfile.status = 'loading';
        state.asyncState.updateProfile.error = null;
      })
      .addCase(updateProfileAsyncAction.fulfilled, (state, action) => {
        state.userProfile.profile = action.payload;
        state.asyncState.updateProfile.status = 'succeeded';
      })
      .addCase(updateProfileAsyncAction.rejected, (state, action) => {
        state.asyncState.updateProfile.status = 'failed';
        state.asyncState.updateProfile.error = action.error.message ?? 'Something went wrong';
      })

      /*
      =========================
      ADD ADDRESS
      =========================
      */
      .addCase(addAddressAsyncAction.pending, (state) => {
        state.asyncState.addAddress.status = 'loading';
        state.asyncState.addAddress.error = null;
      })
      .addCase(addAddressAsyncAction.fulfilled, (state, action) => {
        state.userProfile.addressBooks.push(action.payload);
        state.asyncState.addAddress.status = 'succeeded';
      })
      .addCase(addAddressAsyncAction.rejected, (state, action) => {
        state.asyncState.addAddress.status = 'failed';
        state.asyncState.addAddress.error = action.error.message ?? 'Something went wrong';
      })

      /*
      =========================
      DELETE ADDRESS
      =========================
      */
      .addCase(deleteAddressAsyncAction.pending, (state) => {
        state.asyncState.deleteAddress.status = 'loading';
        state.asyncState.deleteAddress.error = null;
      })
      .addCase(deleteAddressAsyncAction.fulfilled, (state, action) => {
        state.userProfile.addressBooks = state.userProfile.addressBooks.filter(
          (a) => a.id !== action.payload,
        );
        state.asyncState.deleteAddress.status = 'succeeded';
      })
      .addCase(deleteAddressAsyncAction.rejected, (state, action) => {
        state.asyncState.deleteAddress.status = 'failed';
        state.asyncState.deleteAddress.error = action.error.message ?? 'Something went wrong';
      })

      /*
      =========================
      UPDATE ADDRESS
      =========================
      */
      .addCase(updateAddressAsyncAction.pending, (state) => {
        state.asyncState.updateAddress.status = 'loading';
        state.asyncState.updateAddress.error = null;
      })
      .addCase(updateAddressAsyncAction.fulfilled, (state, action) => {
        const updatedAddress = action.payload;

        state.userProfile.addressBooks = state.userProfile.addressBooks.map((address) =>
          address.id === updatedAddress.id ? updatedAddress : address,
        );

        state.asyncState.updateAddress.status = 'succeeded';
      })
      .addCase(updateAddressAsyncAction.rejected, (state, action) => {
        state.asyncState.updateAddress.status = 'failed';
        state.asyncState.updateAddress.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export const userProfileReducer = userProfileSlice.reducer;
export const { addEmptyAddressReducer, resetAsyncState } = userProfileSlice.actions;
