import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "../services/productService";
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

export const fetchProductById = createAsyncThunk<Product | null, string, { rejectValue: string }>(
    "products/fetchProductById",
    async (id, { rejectWithValue }) => {
        try {
            const product = await getProductById(id);
            if (!product) {
                return rejectWithValue("Product not found");
            }
            return product as Product;
        } catch {
            return rejectWithValue("Failed to fetch product");
        }
    }
);