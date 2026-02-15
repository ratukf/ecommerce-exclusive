import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { type Profile, type UserProfile } from '../types/userProfile';

// Get user profile by id
const getUserService = async (id: string): Promise<UserProfile> => {
  const userRef = doc(db, 'userProfiles', id);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    throw new Error('user/not-found');
  }

  return { id: snapshot.id, ...snapshot.data() } as UserProfile;
};

// Update Profile by id
const updateProfileService = async (id: string, profile: Profile): Promise<Profile> => {
  const userRef = doc(db, 'userProfiles', id);
  await updateDoc(userRef, { profile });
  return profile;
};

export { getUserService, updateProfileService };
