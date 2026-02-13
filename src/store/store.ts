import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth.slice';
import { userProfileReducer } from './userProfile.slice';
import { productReducer } from './products.slice';
import { messageReducer } from './message.slice';
import { type Action } from '@reduxjs/toolkit';
import { logOut } from './authAsyncAction.ts';

const appReducers = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  products: productReducer,
  message: messageReducer,
});

const rootReducer = (state: ReturnType<typeof appReducers> | undefined, action: Action) => {
  if (action.type === logOut.fulfilled.type) {
    state = undefined;
  }
  return appReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
