import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store/auth.slice.ts';
import { userProfileReducer } from '../features/userProfile/store/userProfile.slice.ts';
import { productReducer } from '../features/products/store/products.slice.ts';
import { messageReducer } from '../features/message/store/message.slice.ts';
import { orderReducer } from '../features/orders/store/orders.slice.ts';
import { logOutAsyncAction } from '../features/auth/store/authAsyncAction.ts';

const appReducers = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  products: productReducer,
  message: messageReducer,
  orders: orderReducer,
});

const rootReducer: typeof appReducers = (state, action) => {
  if (action.type === logOutAsyncAction.fulfilled.type) {
    return appReducers(undefined, action);
  }
  return appReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
