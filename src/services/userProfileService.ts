import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { emptyUserProfile, type Profile, type UserProfile } from '../types/userProfile';

// Get user profile by id
const getUser = async (id: string): Promise<UserProfile> => {
  const userDoc = await getDoc(doc(db, 'userProfiles', id));
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return emptyUserProfile;
};

// Update Profile by id
const updateProfile = async (id: string, profile: Profile): Promise<Profile> => {
  const userRef = doc(db, 'userProfiles', id);
  if (!id || !profile) {
    throw new Error('ID or profile not inputted');
  }
  try {
    await updateDoc(userRef, {
      'profile.displayName': profile.displayName,
      'profile.email': profile.email,
      'profile.phone': profile.phone,
    });
    const snapshot = await getDoc(userRef);
    return snapshot.data() as Profile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export { getUser, updateProfile };
