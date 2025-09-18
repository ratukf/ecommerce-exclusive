import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './product/productSlice.ts';
import { messageReducer } from './message/messageSlice.ts';
import { accountReducer } from './account/accountSlice.ts';

export const store = configureStore({
  reducer: {
    products: productReducer,
    messages: messageReducer,
    account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
