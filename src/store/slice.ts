import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "./asyncAction";

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

const initialState: ProductState = {
    products: [],
    productDetail: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
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

export default productSlice.reducer;