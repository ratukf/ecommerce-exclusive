import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Carts } from '../store/account/accountSlice';
import type { User } from 'firebase/auth';

export interface UserProfile {
  id: string;
  profile: {
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
  addressBooks: [];
  carts: [];
  orders: [];
  wishList: [];
}

export const createUserProfile = async (user: User) => {
  const profileData = {
    user_id: user.uid,
    profile: {
      name: user.displayName ?? '',
      email: user.email ?? '',
      firstName: user.displayName?.split(' ')[0] ?? '',
      lastName: user.displayName?.split(' ').pop() ?? '',
      photoUrl: user.photoURL ?? '',
      phone: '',
    },
    carts: [],
    addressBooks: [],
    orders: [],
    wishList: [],
  };

  await setDoc(doc(db, 'userProfiles', user.uid), profileData);

  return profileData;
};

export const getUser = async (uid: string): Promise<UserProfile> => {
  const userDoc = await getDoc(doc(db, 'userProfiles', uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return {
    id: uid,
    profile: { name: '', email: '', firstName: '', lastName: '', photoUrl: '' },
    addressBooks: [],
    carts: [],
    orders: [],
    wishList: [],
  };
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  try {
    const userRef = doc(db, 'userProfiles', userId);
    const userSnap = await getDoc(userRef);

    let newCarts: Carts[] = [];
    if (userSnap.exists()) {
      const data = userSnap.data();
      const carts = Array.isArray(data.carts) ? data.carts : [];
      const existingIdx = carts.findIndex((item: Carts) => item.product_id === productId);

      if (existingIdx !== -1) {
        // Update quantity if product is already exist
        newCarts = carts.map((item: Carts, idx: number) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + quantity } : item,
        );
      } else {
        // Add new product to cart
        newCarts = [...carts, { product_id: productId, quantity }];
      }
    } else {
      // User document does not exist, create a new one
      newCarts = [{ product_id: productId, quantity }];
    }

    await setDoc(userRef, { carts: newCarts }, { merge: true });

    return { success: true };
  } catch (error) {
    console.error('Failed to add to cart:', error);
    return { success: false, error };
  }
};
