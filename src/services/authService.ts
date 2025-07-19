import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import type { User } from "firebase/auth";

export const logIn = async (email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
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

export const signUpGoogle = async (): Promise<User | null> => {
    const provider = new GoogleAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up with Google:", error);
        throw error;
    }
}

export const signUpGithub = async (): Promise<User | null> => {
    const provider = new GithubAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up with GitHub:", error);
        throw error;
    }
}

export const logOut = async (): Promise<void> => {
    await auth.signOut();
}
