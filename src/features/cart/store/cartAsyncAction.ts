import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Cart, Item } from '../type';
import { addCartService, getCartService } from '../service/cartService';

// Get cart
export const fetchCart = createAsyncThunk<Cart | null, string>(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getCartService(userId);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

// Add product to cart
export const addItemToCart = createAsyncThunk<Cart, { userId: string; item: Item }>(
  'cart/addItemToCart',
  async ({ userId, item }, { rejectWithValue }) => {
    try {
      const data = await addCartService(userId, item);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);
