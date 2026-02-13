import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById } from './productsAsyncAction';
import type { ProductState } from '../types/products';

// Initial state
const initialStateProduct: ProductState = {
  products: [],
  productDetail: null,
  loading: false,
  error: null,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: initialStateProduct,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch products actions
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to fetch products';
      })
      // Handle fetch product by ID actions
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to fetch product';
      });
  },
});

export const productReducer = productSlice.reducer;
