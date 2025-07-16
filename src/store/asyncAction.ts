import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../services/productService";
import type { Product } from "./slice";

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const products = await getProducts();
            return products as Product[];
        } catch {
            return rejectWithValue("Failed to fetch products");
        }
    }
);