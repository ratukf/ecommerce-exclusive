import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      // Handle fetch product by ID actions
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productDetail = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.productDetail = null;
      })
      .addMatcher(isPending(fetchProducts, fetchProductById), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejected(fetchProducts, fetchProductById), (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Something went wrong');
      })
      .addMatcher(isFulfilled(fetchProducts, fetchProductById), (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const productReducer = productSlice.reducer;
