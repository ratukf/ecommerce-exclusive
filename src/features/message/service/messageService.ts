import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';

// Send contact message to the ecommerce support
const sendContactMessageService = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  return await addDoc(collection(db, 'messages'), data);
};

export { sendContactMessageService };
