import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { logOut, signIn, signUp, signUpGithub, signUpGoogle } from './authAsyncAction';
import type { User } from 'firebase/auth';
import type { Auth, AuthState } from '../types/auth';

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
      // Sign in with email and password
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload as User;
        state.auth = setUserProfileFromAuth(user);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to sign in';
      })
      // Sign up with email and password
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload as User;
        state.auth = setUserProfileFromAuth(user);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to sign up';
      })
      // Sign up / login with Google
      .addCase(signUpGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpGoogle.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload as User;
        state.auth = setUserProfileFromAuth(user);
      })
      .addCase(signUpGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to sign up with Google';
      })
      // Sign up / login with GitHub
      .addCase(signUpGithub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpGithub.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload as User;
        state.auth = setUserProfileFromAuth(user);
      })
      .addCase(signUpGithub.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to sign up with GitHub';
      })
      // Logout
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to log out';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.auth = initialStateAuth.auth;
        state.loading = false;
        state.error = null;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setAuth, resetAuth } = authSlice.actions;
