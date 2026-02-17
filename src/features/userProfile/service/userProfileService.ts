import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/firebase';
import { type Profile, type UserProfile, type Wishlist } from '../types';
import type { Address } from '../../../shared/types/address';
import type { Product } from '../../products/types';

// Get user profile by id
const getUserService = async (): Promise<UserProfile> => {
  const id = auth.currentUser?.uid;
  if (!id) throw new Error('User no authenticated');

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

// Delete address
const deleteAddressService = async (addressId: string): Promise<string> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  const userRef = doc(db, 'userProfiles', uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) throw new Error('user/not-found');

  await updateDoc(userRef, {
    addressBooks: snapshot.data().addressBooks.filter((a: any) => a.id !== addressId),
  });

  return addressId;
};

// Update address
const updateAddressService = async (
  addressId: string,
  updatedAddress: Address,
): Promise<Address> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  const userRef = doc(db, 'userProfiles', uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) throw new Error('user/not-found');

  const currentAddresses: Address[] = snapshot.data().addressBooks || [];

  const updatedAddresses = currentAddresses.map((address) =>
    address.id === addressId ? updatedAddress : address,
  );

  await updateDoc(userRef, {
    addressBooks: updatedAddresses,
  });

  return updatedAddress;
};

// Toggle wishlist
const toggleWishlistService = async (productId: string): Promise<Wishlist[]> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');

  const productRef = doc(db, 'products', productId);
  const productSnapshot = await getDoc(productRef);
  if (!productSnapshot.exists()) throw new Error('product/not-found');
  const selectedProduct = productSnapshot.data() as Product;

  if (!selectedProduct) {
    throw new Error('product/not-found');
  }

  const userRef = doc(db, 'userProfiles', uid);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) throw new Error('user/not-found');

  const currentWishlist: Wishlist[] = userSnapshot.data().wishlist || [];

  const isWishlistExist = currentWishlist.some((item) => item.productId === productId);

  const newWishlist = isWishlistExist
    ? currentWishlist.filter((item) => item.productId !== productId)
    : [
        ...currentWishlist,
        {
          id: Date.now().toString(),
          productId: selectedProduct.id,
          name: selectedProduct.name,
          imageUrls: selectedProduct.imageUrls[0],
          price: selectedProduct.price,
          addedAt: new Date().toISOString(),
          description: selectedProduct.description,
        },
      ];

  await updateDoc(userRef, { wishlist: newWishlist });

  return newWishlist;
};

export {
  getUserService,
  updateProfileService,
  addAddressService,
  deleteAddressService,
  updateAddressService,
  toggleWishlistService,
};
