import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { Carts } from '../store/account/accountSlice';

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
        // Update quantity jika produk sudah ada
        newCarts = carts.map((item: Carts, idx: number) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + quantity } : item,
        );
      } else {
        // Tambah produk baru ke cart
        newCarts = [...carts, { product_id: productId, quantity }];
      }
    } else {
      // Dokumen user belum ada, buat baru
      newCarts = [{ product_id: productId, quantity }];
    }

    await setDoc(userRef, { carts: newCarts }, { merge: true });

    return { success: true };
  } catch (error) {
    console.error('Failed to add to cart:', error);
    return { success: false, error };
  }
};
