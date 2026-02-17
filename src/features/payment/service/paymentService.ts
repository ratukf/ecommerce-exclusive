import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import type { Payment, PaymentInput } from '../type';

export const createPaymentService = async (input: PaymentInput): Promise<Payment> => {
  const payload = {
    ...input,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, 'payments'), payload);

  return {
    id: docRef.id,
    ...payload,
  };
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
