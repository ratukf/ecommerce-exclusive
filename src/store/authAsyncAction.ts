import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import {
  logInService,
  signUpService,
  signUpGoogleService,
  signUpGithubService,
  logOutService,
  ensureUserProfileService,
  updateAuthService,
} from '../services/authService';
import { mapFirebaseAuthError } from '../utils/mapError';

// Sign in with email and password
const signIn = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await logInService(email, password);
    } catch (error) {
      return rejectWithValue(mapFirebaseAuthError(error));
    }
  },
);

// Sign up with email and password
const signUp = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/signUp', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    return await signUpService(name, email, password);
  } catch (error) {
    return rejectWithValue(mapFirebaseAuthError(error));
  }
});

// Sign up / login with Google
const signUpGoogle = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/signUpGoogle',
  async (_, { rejectWithValue }) => {
    try {
      return await signUpGoogleService();
    } catch (error) {
      return rejectWithValue(mapFirebaseAuthError(error));
    }
  },
);

// Sign up / login with GitHub
const signUpGithub = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/signUpGithub',
  async (_, { rejectWithValue }) => {
    try {
      return await signUpGithubService();
    } catch (error) {
      return rejectWithValue(mapFirebaseAuthError(error));
    }
  },
);

// Logout
const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      return await logOutService();
    } catch (error) {
      return rejectWithValue(mapFirebaseAuthError(error));
    }
  },
);

// Create user profile when sucessfully sign up for the first time
const ensureUserProfile = createAsyncThunk<void, User, { rejectValue: string }>(
  'auth/ensureUserProfile',
  async (user, { rejectWithValue }) => {
    try {
      return await ensureUserProfileService(user);
    } catch (error: any) {
      return rejectWithValue(mapFirebaseAuthError(error));
    }
  },
);

const updateAuthAsyncAction = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/updateAuth',
  async (name, { rejectWithValue }) => {
    try {
      await updateAuthService(name);
    } catch (error) {
      return rejectWithValue(mapFirebaseAuthError(error));
    }
  },
);

export {
  signIn,
  signUp,
  signUpGoogle,
  signUpGithub,
  logOut,
  ensureUserProfile,
  updateAuthAsyncAction,
};
