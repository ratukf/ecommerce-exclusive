import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById } from '../services/productService';
import type { Product } from './slice';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../services/userProfileService';

const createProfile = async (user: User, name: string, email: string) => {
  const { createUserProfile } = await import('../services/userProfileService');
  const userProfile: UserProfile = {
    uid: user.uid,
    name: name,
    email: email || '',
  };
  createUserProfile(userProfile);
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await getProducts();
      return products as Product[];
    } catch {
      return rejectWithValue('Failed to fetch products');
    }
  },
);

export const fetchProductById = createAsyncThunk<Product | null, string, { rejectValue: string }>(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const product = await getProductById(id);
      if (!product) {
        return rejectWithValue('Product not found');
      }
      return product as Product;
    } catch {
      return rejectWithValue('Failed to fetch product');
    }
  },
);

export const sendContactMessage = createAsyncThunk<
  boolean,
  { name: string; email: string; phone: string; message: string },
  { rejectValue: string }
>('contact/sendContactMessage', async (data, { rejectWithValue }) => {
  try {
    const result = await import('../services/contactService').then((module) =>
      module.sendContactMessage(data),
    );
    if (!result) {
      return rejectWithValue('Failed to send contact message');
    }
    return true;
  } catch (error) {
    console.error('Error sending contact message:', error);
    return rejectWithValue('Failed to send contact message');
  }
});

export const signIn = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
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
});

export const signUp = createAsyncThunk<
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

export const signUpGoogle = createAsyncThunk<User, void, { rejectValue: string }>(
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

export const signUpGithub = createAsyncThunk<User, void, { rejectValue: string }>(
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

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
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

export const getUserProfile = createAsyncThunk<UserProfile | null, string, { rejectValue: string }>(
  'user/getUserProfile',
  async (uid, { rejectWithValue }) => {
    try {
      const { getUser } = await import('../services/userProfileService');
      const userProfile = await getUser(uid);
      if (!userProfile) {
        return rejectWithValue('User profile not found');
      }
      return userProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue('Failed to fetch user profile');
    }
  },
);
