import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  uid: string;
  name?: string;
  email?: string;
}

// Create a new user profile
const createUserProfile = async (user: UserProfile) => {
  const profileData = {
    user_id: user.uid,
    profile: {
      name: user.name ?? '',
      email: user.email ?? '',
      firstName: '',
      lastName: '',
      photoUrl: '',
    },
    addressBooks: [],
    orders: [],
    wishList: [],
  };

  await setDoc(doc(db, 'userProfiles', user.uid), profileData);

  return profileData;
};

// Get user profile by UID
const getUser = async (uid: string): Promise<UserProfile | null> => {
  const userDoc = await getDoc(doc(db, 'userProfiles', uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
};

export { createUserProfile, getUser };
