// features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Cart, CartState } from '../type';
import { addItemToCart, fetchCart } from './cartAsyncAction';

const initialState: CartState = {
  cart: null,
  asyncState: {
    getCart: { error: null, status: 'idle' },
    addCart: { error: null, status: 'idle' },
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ====================================================
      // GET CART
      // ====================================================
      .addCase(fetchCart.pending, (state) => {
        state.asyncState.getCart.status = 'loading';
        state.asyncState.getCart.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart | null>) => {
        state.asyncState.getCart.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.asyncState.getCart.status = 'failed';
        state.asyncState.getCart.error = action.payload as string;
      })
      // ====================================================
      // ADD PRODUCT TO CART
      // ====================================================
      .addCase(addItemToCart.pending, (state) => {
        state.asyncState.addCart.status = 'loading';
        state.asyncState.addCart.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<Cart | null>) => {
        state.asyncState.addCart.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.asyncState.addCart.status = 'failed';
        state.asyncState.addCart.error = action.payload as string;
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const { clearCart } = cartSlice.actions;
