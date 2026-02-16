import { createSlice } from '@reduxjs/toolkit';
import { type OrdersState } from '../types';
import { getOrdersAsyncAction } from './ordersAsyncActions';

const initialOrders: OrdersState = {
  orders: [
    {
      id: '',
      userId: '',
      items: [
        {
          productId: '',
          name: '',
          price: 0,
          quantity: 0,
          imageUrls: '',
        },
      ],
      subtotal: 0,
      shippingCost: 0,
      totalAmount: 0,
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: '',
    },
  ],
  asyncState: {
    getOrders: { status: 'idle', error: null },
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrders,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAsyncAction.pending, (state) => {
        state.asyncState.getOrders.status = 'loading';
        state.asyncState.getOrders.error = null;
      })
      .addCase(getOrdersAsyncAction.rejected, (state, action) => {
        state.asyncState.getOrders.status = 'failed';
        state.asyncState.getOrders.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(getOrdersAsyncAction.fulfilled, (state, action) => {
        state.asyncState.getOrders.status = 'succeeded';
        state.orders = action.payload;
      });
  },
});

export const orderReducer = ordersSlice.reducer;
