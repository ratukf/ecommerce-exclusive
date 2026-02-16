import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import type { Product } from '../types';

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, 'products'));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const docRef = doc(db, 'products', id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error('not-found');
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Product;
};
