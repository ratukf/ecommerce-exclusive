import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createPaymentService,
  getPaymentsByUserService,
  updatePaymentStatusService,
} from '../service/paymentService';
import type { Payment, PaymentInput } from '../type';
import { clearCart } from '../../cart/store/cart.slice';

export const createPayment = createAsyncThunk<Payment, PaymentInput>(
  'payment/createPayment',
  async (input, { rejectWithValue, dispatch }) => {
    try {
      const data = await createPaymentService(input);
      if (input.fromCart) {
        dispatch(clearCart());
      }
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

export const fetchPaymentsByUser = createAsyncThunk<Payment[], string>(
  'payment/fetchPaymentsByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getPaymentsByUserService(userId);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

export const updatePaymentStatus = createAsyncThunk<
  { paymentId: string; status: Payment['status'] },
  { paymentId: string; status: Payment['status'] }
>('payment/updatePaymentStatus', async ({ paymentId, status }, { rejectWithValue }) => {
  try {
    await updatePaymentStatusService(paymentId, status);
    return { paymentId, status };
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});
