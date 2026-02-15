import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapFirebaseError } from '../utils/mapError';
import { sendContactMessageService } from '../services/messageService';

// Send contact message
export const sendContactMessage = createAsyncThunk<
  boolean,
  { name: string; email: string; phone: string; message: string },
  { rejectValue: string }
>('contact/sendContactMessage', async (data, { rejectWithValue }) => {
  try {
    await sendContactMessageService(data);
    return true;
  } catch (error) {
    return rejectWithValue(mapFirebaseError(error));
  }
});
