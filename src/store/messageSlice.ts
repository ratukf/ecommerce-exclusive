import { createSlice } from '@reduxjs/toolkit';
import { sendContactMessage } from './asyncAction';

// --- Message Slice ---
export interface Message {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface MessageState {
  loading: boolean;
  error: string | null;
}

const initialStateMessage: MessageState = {
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialStateMessage,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
