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
const logInService = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Signup with email and password
const signUpService = async (name: string, email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  return userCredential.user;
};

// Signup / login with Google
const signUpGoogleService = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
};

// Signup / login with GitHub
const signUpGithubService = async (): Promise<User> => {
  const provider = new GithubAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
};

// Logout
const logOutService = async (): Promise<void> => {
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
        displayName: user.displayName ?? '',
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

// Update user data
const updateAuthService = async (name: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  await updateProfile(user, {
    displayName: name,
  });
};

export {
  logInService,
  signUpService,
  signUpGoogleService,
  signUpGithubService,
  logOutService,
  ensureUserProfileService,
  updateAuthService,
};
