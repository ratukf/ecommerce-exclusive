import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../types';
import { getProductById, getProducts } from '../service/productService';
import { mapFirebaseError } from '../../../shared/utils/mapError';

// Fetch all products
const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
      return rejectWithValue(mapFirebaseError(error));
    }
  },
);

// Fetch product by ID
const fetchProductById = createAsyncThunk<Product, string, { rejectValue: string }>(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch (error) {
      return rejectWithValue(mapFirebaseError(error));
    }
  },
);

export { fetchProducts, fetchProductById };
