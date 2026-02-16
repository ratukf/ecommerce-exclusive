import { createSlice } from '@reduxjs/toolkit';
import type { MessageState } from '../types';
import { sendContactMessage } from './messageAsyncAction';

// Initial state
const initialStateMessage: MessageState = {
  loading: false,
  error: null,
};

// Message slice
const messageSlice = createSlice({
  name: 'message',
  initialState: initialStateMessage,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle send contact message actions
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to send message';
      });
  },
});

export const messageReducer = messageSlice.reducer;
