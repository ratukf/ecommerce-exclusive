import { configureStore } from "@reduxjs/toolkit";
import { productReducer, messageReducer  } from './slice.ts';

export const store = configureStore({
    reducer: {
        products: productReducer,
        messages: messageReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;