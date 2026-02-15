import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { type Profile, type UserProfile } from '../../../shared/types/userProfile';
import type { AddressBooks } from '../../../shared/types/address';

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

// Save address books by id
const saveAddressBooksService = async (
  id: string,
  addressBooks: AddressBooks,
): Promise<AddressBooks> => {
  const userRef = doc(db, 'userProfiles', id);
  await setDoc(userRef, { addressBooks });
  return addressBooks;
};

export { getUserService, updateProfileService, saveAddressBooksService };
