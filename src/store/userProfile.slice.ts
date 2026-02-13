import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from './userProfileAsyncAction';
import type { UserProfile, UserProfileState } from '../types/userProfile';

const initialUserProfile: UserProfileState = {
  userProfile: {
    id: '',
    profile: {
      name: '',
      email: '',
      phone: '',
    },
    addressBooks: [
      {
        id: Date.now().toString(),
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
    ],
    orders: [
      {
        id: Date.now().toString(),
        product_id: '',
        total: 0,
        createdAt: '',
      },
    ],
    wishlist: [
      {
        productId: '',
        addedAt: '',
      },
    ],
  },
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'userProfile',
  initialState: initialUserProfile,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const userProfile = action.payload as UserProfile | null;
        const data = userProfile ?? {
          id: 'not found',
          profile: {
            name: 'not found',
            email: 'not found',
            phone: 'not found',
          },
          addressBooks: [],
          orders: [],
          wishlist: [],
        };
        state.userProfile = {
          id: data.id ?? 'not found',
          profile: {
            name: data.profile?.name ?? 'not found',
            email: data.profile?.email ?? 'not found',
            phone: data.profile?.phone ?? 'not found',
          },
          addressBooks: data.addressBooks ?? [],
          orders: data.orders ?? [],
          wishlist: data.wishlist ?? [],
        };
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to fetch user profile';
      });
  },
});

export const accountReducer = accountSlice.reducer;
