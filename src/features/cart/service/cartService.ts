import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/firebase';
import type { Cart, Item } from '../type';

// Add product to cart
export const addCartService = async (userId: string, item: Item): Promise<Cart> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  const docRef = doc(db, 'cart', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, { item: arrayUnion(item) });
  } else {
    await setDoc(docRef, { userId, item: [item] });
  }

  const updatedSnap = await getDoc(docRef);
  const data = updatedSnap.data();

  return {
    userId: data?.userId ?? userId,
    item: data?.item ?? [],
  };
};

// Get cart
export const getCartService = async (userId: string): Promise<Cart | null> => {
  const docRef = doc(db, 'cart', userId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    userId: data.userId,
    item: data.item ?? [],
  };
};
