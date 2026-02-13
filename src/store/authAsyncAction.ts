import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import { createProfile } from './userProfileAsyncAction';

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
    createProfile(user, name, email);
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
      createProfile(user, user.displayName || '', user.email || '');
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
      createProfile(user, user.displayName || '', user.email || '');
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

export { createProfile, signIn, signUp, signUpGoogle, signUpGithub, logOut };
