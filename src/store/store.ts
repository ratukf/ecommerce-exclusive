import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth.slice';
import { userProfileReducer } from './userProfile.slice';
import { productReducer } from './products.slice';
import { messageReducer } from './message.slice';
import { logOut } from './authAsyncAction.ts';

const appReducers = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  products: productReducer,
  message: messageReducer,
});

const rootReducer: typeof appReducers = (state, action) => {
  if (action.type === logOut.fulfilled.type) {
    return appReducers(undefined, action);
  }
  return appReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
