import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";

export const logIn = async (email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }

export const signUp = async (name: string, email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName: name });
        }
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}
