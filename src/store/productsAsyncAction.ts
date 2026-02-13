import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../types/products';
import { getProductById, getProducts } from '../services/productService';

// Fetch all products
const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
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

// Fetch product by ID
const fetchProductById = createAsyncThunk<Product | null, string, { rejectValue: string }>(
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

export { fetchProducts, fetchProductById };
