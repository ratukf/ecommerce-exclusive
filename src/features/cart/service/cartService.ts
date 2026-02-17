import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import type { Cart, Item } from '../type';

// Add product to cart
export const addCartService = async (userId: string, item: Item): Promise<Cart> => {
  const docRef = doc(db, 'cart', userId);
  const docSnap = await getDoc(docRef);

  let updatedItems: Item[] = [];

  if (docSnap.exists()) {
    const data = docSnap.data();
    const existingItems: Item[] = data?.item ?? [];

    const index = existingItems.findIndex((i) => i.productId === item.productId);
    if (index >= 0) {
      const newQuantity = item.quantity;
      if (newQuantity <= 0) {
        existingItems.splice(index, 1);
      } else {
        existingItems[index] = { ...existingItems[index], quantity: newQuantity };
      }
    } else if (item.quantity > 0) {
      existingItems.push(item);
    }

    updatedItems = existingItems;
    await setDoc(docRef, { userId, item: updatedItems });
  } else if (item.quantity > 0) {
    updatedItems = [item];
    await setDoc(docRef, { userId, item: updatedItems });
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
