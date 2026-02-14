import { auth, db } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Login with email and password
const logIn = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Signup with email and password
const signUp = async (name: string, email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Signup / login with Google
const signUpGoogle = async (): Promise<User | null> => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with Google:', error);
    throw error;
  }
};

// Signup / login with GitHub
const signUpGithub = async (): Promise<User | null> => {
  const provider = new GithubAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with GitHub:', error);
    throw error;
  }
};

// Logout
const logOut = async (): Promise<void> => {
  await auth.signOut();
};

// Create user profile when sucessfully sign up for the first time
const ensureUserProfileService = async (user: User) => {
  const userRef = doc(db, 'userProfiles', user.uid);
  await setDoc(
    userRef,
    {
      id: user.uid,
      profile: {
        name: user.displayName ?? '',
        email: user.email ?? '',
        phone: '',
      },
      addressBooks: [],
      orders: [],
      wishlist: [],
    },
    { merge: true },
  );
};

export { logIn, signUp, signUpGoogle, signUpGithub, logOut, ensureUserProfileService };
