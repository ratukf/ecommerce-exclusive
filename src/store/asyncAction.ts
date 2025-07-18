import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "../services/productService";
import type { Product } from "./slice";
import type { User } from "firebase/auth";

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

export const sendContactMessage = createAsyncThunk<boolean, { name: string; email: string; phone: string; message: string }, { rejectValue: string }>(
    "contact/sendContactMessage",
    async (data, { rejectWithValue }) => {
        try {
            const result = await import("../services/contactService").then(module => module.sendContactMessage(data));
            if (!result) {
                return rejectWithValue("Failed to send contact message");
            }
            return true;
        } catch (error) {
            console.error("Error sending contact message:", error);
            return rejectWithValue("Failed to send contact message");
        }
    }
);

export const signIn = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
    "auth/signIn",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { logIn } = await import("../services/authService");
            const user = await logIn(email, password);
            if (!user) {
                return rejectWithValue("Invalid email or password");
            }
            return user;
        } catch (error) {
            console.error("Error signing in:", error);
            return rejectWithValue("Failed to sign in");
        }
    }
);