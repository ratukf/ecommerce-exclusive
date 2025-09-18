import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './productSlice.ts';
import { messageReducer } from './messageSlice.ts';
import { accountReducer } from './accountSlice.ts';

export const store = configureStore({
  reducer: {
    products: productReducer,
    messages: messageReducer,
    account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
