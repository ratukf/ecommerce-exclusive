import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById, sendContactMessage } from "./asyncAction";

export interface Review {
    id: string;
    comment: string;
    rating: number;
    userId: string;
    date: string;
}

export interface Variant {
    id: string;
    name: string;
    price: number;
    stock: number;
    color: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    categories: Array<string>;
    imageUrls: Array<string>;
    reviews: Array<Review>;
    variants: Array<Variant>;
    description: string;
}

interface ProductState {
    products: Product[];
    productDetail: Product | null;
    loading: boolean;
    error: string | null;
}

const initialStateProduct: ProductState = {
    products: [],
    productDetail: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState: initialStateProduct,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch products";
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetail = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch product";
            });
    },
});

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
                state.error = typeof action.payload === "string" ? action.payload : "Failed to send message";
            });
    },
})

export const productReducer = productSlice.reducer;
export const messageReducer = messageSlice.reducer;