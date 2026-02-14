import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import { ensureUserProfileService, updateAuth } from '../services/authService';

// Sign in with email and password
const signIn = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { logIn } = await import('../services/authService');
      const user = await logIn(email, password);
      if (!user) {
        return rejectWithValue('Invalid email or password');
      }
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      return rejectWithValue('Failed to sign in');
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
    const { signUp } = await import('../services/authService');
    const user = await signUp(name, email, password);
    if (!user) {
      return rejectWithValue('Failed to create account');
    }
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    return rejectWithValue('Failed to create account');
  }
});

// Sign up / login with Google
const signUpGoogle = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/signUpGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const { signUpGoogle } = await import('../services/authService');
      const user = await signUpGoogle();
      if (!user) {
        return rejectWithValue('Failed to sign up with Google');
      }
      return user;
    } catch (error) {
      console.error('Error signing up with Google:', error);
      return rejectWithValue('Failed to sign up with Google');
    }
  },
);

// Sign up / login with GitHub
const signUpGithub = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/signUpGithub',
  async (_, { rejectWithValue }) => {
    try {
      const { signUpGithub } = await import('../services/authService');
      const user = await signUpGithub();
      if (!user) {
        return rejectWithValue('Failed to sign up with GitHub');
      }
      return user;
    } catch (error) {
      console.error('Error signing up with GitHub:', error);
      return rejectWithValue('Failed to sign up with GitHub');
    }
  },
);

// Logout
const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const { logOut } = await import('../services/authService');
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
      return rejectWithValue('Failed to log out');
    }
  },
);

// Create user profile when sucessfully sign up for the first time
const ensureUserProfile = createAsyncThunk<void, User, { rejectValue: string }>(
  'auth/ensureUserProfile',
  async (user, { rejectWithValue }) => {
    try {
      await ensureUserProfileService(user);
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to ensure user profile');
    }
  },
);

const updateAuthAsyncAction = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/updateAuth',
  async (name, { rejectWithValue }) => {
    try {
      await updateAuth(name);
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to update name');
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
