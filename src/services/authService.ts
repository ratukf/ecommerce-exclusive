import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { User } from "firebase/auth";

export const logIn = async (email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};