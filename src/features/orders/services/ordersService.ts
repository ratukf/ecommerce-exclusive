import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../services/firebase';
import type { Orders } from '../types';

const getOrders = async (): Promise<Orders[]> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('userId', '==', uid));
  const snapShot = await getDocs(q);

  const orders = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Orders[];
  return orders;
};

export { getOrders };
