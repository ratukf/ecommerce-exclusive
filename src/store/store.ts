import { configureStore } from '@reduxjs/toolkit';
import { productReducer, messageReducer, accountReducer } from './slice.ts';

export const store = configureStore({
  reducer: {
    products: productReducer,
    messages: messageReducer,
    account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
