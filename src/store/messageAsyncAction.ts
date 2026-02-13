import { createAsyncThunk } from '@reduxjs/toolkit';

// Send contact message
export const sendContactMessage = createAsyncThunk<
  boolean,
  { name: string; email: string; phone: string; message: string },
  { rejectValue: string }
>('contact/sendContactMessage', async (data, { rejectWithValue }) => {
  try {
    const result = await import('../services/messageService').then((module) =>
      module.sendContactMessage(data),
    );
    if (!result) {
      return rejectWithValue('Failed to send contact message');
    }
    return true;
  } catch (error) {
    console.error('Error sending contact message:', error);
    return rejectWithValue('Failed to send contact message');
  }
});
