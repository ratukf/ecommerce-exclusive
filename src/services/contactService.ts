import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    await addDoc(collection(db, 'messages'), data);
    return true;
  } catch (error) {
    console.error('Failed to send contact message:', error);
    return false;
  }
};
