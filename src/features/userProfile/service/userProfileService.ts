import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/firebase';
import { type Profile, type UserProfile } from '../../../shared/types/userProfile';
import type { Address } from '../../../shared/types/address';

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

// Add adress
const addAddressService = async (newAddress: Address): Promise<Address> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  const docRef = doc(db, 'userProfiles', uid);
  await updateDoc(docRef, { addressBooks: arrayUnion(newAddress) });
  return newAddress;
};

export { getUserService, updateProfileService, addAddressService };
