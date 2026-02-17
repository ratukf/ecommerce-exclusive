import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../services/firebase';
import type { Payment, PaymentInput } from '../type';

export const createPaymentService = async (input: PaymentInput): Promise<Payment> => {
  const payload = {
    ...input,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, 'payments'), payload);
  const payment: Payment = { id: docRef.id, ...payload };

  const userProfileRef = doc(db, 'userProfiles', input.userId);
  const userProfileSnap = await getDoc(userProfileRef);

  if (userProfileSnap.exists()) {
    const existingData = userProfileSnap.data();
    const existingOrders = existingData?.orders ?? [];

    const newOrder = {
      id: payment.id,
      product_id: input.items.map((i) => i.productId).join(','),
      total: input.totalAmount,
      createdAt: payment.createdAt,
    };

    await updateDoc(userProfileRef, {
      orders: [...existingOrders, newOrder],
    });
  }

  if (input.fromCart) {
    const cartRef = doc(db, 'cart', input.userId);
    await setDoc(cartRef, { userId: input.userId, item: [] });
  }

  return payment;
};

export const getPaymentsByUserService = async (userId: string): Promise<Payment[]> => {
  const q = query(collection(db, 'payments'), where('userId', '==', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Payment, 'id'>),
  }));
};

export const updatePaymentStatusService = async (
  paymentId: string,
  status: Payment['status'],
): Promise<void> => {
  const docRef = doc(db, 'payments', paymentId);
  await updateDoc(docRef, { status });
};
