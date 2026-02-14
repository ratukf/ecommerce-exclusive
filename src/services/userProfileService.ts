import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  uid: string;
  name?: string;
  email?: string;
}

// Get user profile by UID
const getUser = async (uid: string): Promise<UserProfile | null> => {
  const userDoc = await getDoc(doc(db, 'userProfiles', uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
};

export { getUser };
