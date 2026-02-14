// --- Account Slice ---

// User profile's type
export interface UserProfile {
  id: string;
  profile: Profile;
  addressBooks: AddressBooks[];
  orders: Order[];
  wishlist: Wishlist[];
}

// Profile details'type
export interface Profile {
  displayName: string;
  email: string;
  phone: string;
}

// Address book's type
export interface AddressBooks {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Orders' type
export interface Order {
  id: string;
  product_id: string;
  total: number;
  createdAt: string;
}

// Whishlists' item type
export interface Wishlist {
  productId: string;
  addedAt: string;
}

// User profile status type
export interface UserProfileState {
  userProfile: UserProfile;
  loading: boolean;
  error: string | null;
}

// Empty user profile
export const emptyUserProfile: UserProfile = {
  id: '',
  profile: { displayName: '', email: '', phone: '' },
  addressBooks: [],
  orders: [],
  wishlist: [],
};
