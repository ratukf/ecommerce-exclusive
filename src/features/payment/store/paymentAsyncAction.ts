import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Payment, PaymentInput } from '../type';
import {
  createPaymentService,
  getPaymentsByUserService,
  updatePaymentStatusService,
} from '../service/paymentService';

export const createPayment = createAsyncThunk<Payment, PaymentInput>(
  'payment/createPayment',
  async (input, { rejectWithValue }) => {
    try {
      const data = await createPaymentService(input);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

// Ambil semua payment milik user
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

// Update status payment
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
