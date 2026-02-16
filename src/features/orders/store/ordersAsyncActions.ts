import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Orders } from '../types';
import { getOrders } from '../services/ordersService';
import { mapFirebaseError } from '../../../shared/utils/mapError';

const getOrdersAsyncAction = createAsyncThunk<Orders[], void, { rejectValue: string }>(
  'orders/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrders();
    } catch (error) {
      return rejectWithValue(mapFirebaseError(error));
    }
  },
);

export { getOrdersAsyncAction };
