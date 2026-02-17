import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Payment, PaymentState } from '../type';
import { createPayment, fetchPaymentsByUser, updatePaymentStatus } from './paymentAsyncAction';

const initialState: PaymentState = {
  payments: [],
  currentPayment: null,
  asyncState: {
    createPayment: { error: null, status: 'idle' },
    getPayments: { error: null, status: 'idle' },
    updatePaymentStatus: { error: null, status: 'idle' },
  },
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearCurrentPayment(state) {
      state.currentPayment = null;
    },
    clearPayments(state) {
      state.payments = [];
      state.currentPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ====================================================
      // CREATE PAYMENT
      // ====================================================
      .addCase(createPayment.pending, (state) => {
        state.asyncState.createPayment.status = 'loading';
        state.asyncState.createPayment.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.asyncState.createPayment.status = 'succeeded';
        state.currentPayment = action.payload;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.asyncState.createPayment.status = 'failed';
        state.asyncState.createPayment.error = action.payload as string;
      })
      // ====================================================
      // GET PAYMENTS BY USER
      // ====================================================
      .addCase(fetchPaymentsByUser.pending, (state) => {
        state.asyncState.getPayments.status = 'loading';
        state.asyncState.getPayments.error = null;
      })
      .addCase(fetchPaymentsByUser.fulfilled, (state, action: PayloadAction<Payment[]>) => {
        state.asyncState.getPayments.status = 'succeeded';
        state.payments = action.payload;
      })
      .addCase(fetchPaymentsByUser.rejected, (state, action) => {
        state.asyncState.getPayments.status = 'failed';
        state.asyncState.getPayments.error = action.payload as string;
      })
      // ====================================================
      // UPDATE PAYMENT STATUS
      // ====================================================
      .addCase(updatePaymentStatus.pending, (state) => {
        state.asyncState.updatePaymentStatus.status = 'loading';
        state.asyncState.updatePaymentStatus.error = null;
      })
      .addCase(
        updatePaymentStatus.fulfilled,
        (state, action: PayloadAction<{ paymentId: string; status: Payment['status'] }>) => {
          state.asyncState.updatePaymentStatus.status = 'succeeded';

          // Update di list payments
          const index = state.payments.findIndex((p) => p.id === action.payload.paymentId);
          if (index >= 0) {
            state.payments[index].status = action.payload.status;
          }

          // Update currentPayment kalau id-nya sama
          if (state.currentPayment?.id === action.payload.paymentId) {
            state.currentPayment.status = action.payload.status;
          }
        },
      )
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.asyncState.updatePaymentStatus.status = 'failed';
        state.asyncState.updatePaymentStatus.error = action.payload as string;
      });
  },
});

export const paymentReducer = paymentSlice.reducer;
export const { clearCurrentPayment, clearPayments } = paymentSlice.actions;
