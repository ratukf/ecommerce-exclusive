import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  ensureUserProfile,
  logOutAsyncAction,
  signIn,
  signUp,
  signUpGithub,
  signUpGoogle,
  updateAuthAsyncAction,
} from './authAsyncAction';
import type { User } from 'firebase/auth';
import type { Auth, AuthState } from '../../../shared/types/auth';
import { isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';

// Helper function to set user profile from Firebase Auth user
const setUserProfileFromAuth = (user: User): Auth => ({
  id: user.uid,
  email: user.email ?? '',
  displayName: user.displayName ?? '',
  phone: user.phoneNumber ?? '',
  createdAt: user.metadata?.creationTime ?? '',
  photoUrl: user.photoURL ?? '',
});

// Initial state for auth slice
const initialStateAuth: AuthState = {
  auth: {
    id: '',
    email: '',
    displayName: '',
    phone: '',
    photoUrl: '',
    createdAt: '',
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    // Set authentication state for log out
    setAuth: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
      state.error = null;
    },
    // Reset authentication state for log out
    resetAuth: (state) => {
      state.auth = initialStateAuth.auth;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Logout
      .addCase(logOutAsyncAction.fulfilled, (state) => {
        state.auth = initialStateAuth.auth;
      })
      .addMatcher(
        isPending(
          signIn,
          signUp,
          signUpGoogle,
          signUpGithub,
          logOutAsyncAction,
          ensureUserProfile,
          updateAuthAsyncAction,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isRejected(
          signIn,
          signUp,
          signUpGoogle,
          signUpGithub,
          logOutAsyncAction,
          ensureUserProfile,
          updateAuthAsyncAction,
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
          signIn,
          signUp,
          signUpGoogle,
          signUpGithub,
          logOutAsyncAction,
          ensureUserProfile,
          updateAuthAsyncAction,
        ),
        (state) => {
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(isFulfilled(signIn, signUp, signUpGoogle, signUpGithub), (state, action) => {
        state.auth = setUserProfileFromAuth(action.payload);
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setAuth, resetAuth } = authSlice.actions;
