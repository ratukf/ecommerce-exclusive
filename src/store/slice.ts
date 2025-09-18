import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  sendContactMessage,
  signIn,
  signUp,
  signUpGoogle,
  signUpGithub,
  logOut,
  getUserProfile,
} from './asyncAction';
import type { User } from 'firebase/auth';

// --- Product Slice ---
export interface Review {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  date: string;
}

export interface Variant {
  id: string;
  name: string;
  price: number;
  stock: number;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categories: string[];
  imageUrls: string[];
  reviews: Review[];
  variants: Variant[];
  description: string;
}

interface ProductState {
  products: Product[];
  productDetail: Product | null;
  loading: boolean;
  error: string | null;
}

const initialStateProduct: ProductState = {
  products: [],
  productDetail: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState: initialStateProduct,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to fetch product';
      });
  },
});

// --- Message Slice ---
export interface Message {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface MessageState {
  loading: boolean;
  error: string | null;
}

const initialStateMessage: MessageState = {
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialStateMessage,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to send message';
      });
  },
});

// --- Account Slice ---
export interface Account {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  photoUrl?: string;
}

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface AddressBooks {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserProfile {
  id: string;
  profile: Profile;
  addressBooks: AddressBooks[];
}

export interface AccountStatus {
  profile: boolean;
  addresses: boolean;
  orders: boolean;
  wishlist: boolean;
}

interface AccountState {
  account: Account;
  userProfile: UserProfile;
  status: AccountStatus;
  loading: boolean;
  error: string | null;
}

const getInitialAccount = (): Account => ({
  id: '',
  email: '',
  name: '',
  phone: '',
  createdAt: '',
  photoUrl: '',
});

const getInitialUserProfile = (): UserProfile => ({
  id: '',
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  addressBooks: [
    {
      id: Date.now().toString(),
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  ],
});

const getInitialAccountStatus = (): AccountStatus => ({
  profile: false,
  addresses: false,
  orders: false,
  wishlist: false,
});

const setAccountFromUser = (user: User): Account => ({
  id: user.uid,
  email: user.email ?? '',
  name: user.displayName ?? '',
  phone: user.phoneNumber ?? '',
  createdAt: user.metadata?.creationTime ?? '',
  photoUrl: user.photoURL ?? '',
});

const initialStateAccount: AccountState = {
  account: getInitialAccount(),
  userProfile: getInitialUserProfile(),
  status: getInitialAccountStatus(),
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialStateAccount,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.userProfile.profile = action.payload;
    },
    setAddressBook: (state, action: PayloadAction<AddressBooks[]>) => {
      state.userProfile.addressBooks = action.payload;
    },
    setAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    resetAccount: (state) => {
      state.account = getInitialAccount();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload as User;
        state.account = setAccountFromUser(user);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to sign in';
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload as User;
        state.account = setAccountFromUser(user);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to sign up';
      })
      .addCase(signUpGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpGoogle.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload as User;
        state.account = setAccountFromUser(user);
      })
      .addCase(signUpGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to sign up with Google';
      })
      .addCase(signUpGithub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpGithub.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload as User;
        state.account = setAccountFromUser(user);
      })
      .addCase(signUpGithub.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to sign up with GitHub';
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to log out';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.account = getInitialAccount();
        state.userProfile = getInitialUserProfile();
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.status.profile = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status.profile = false;
        const userProfile = action.payload as UserProfile | null;
        state.userProfile = userProfile
          ? {
              id: userProfile.id || '',
              profile: userProfile.profile
                ? {
                    firstName: userProfile.profile.firstName || '',
                    lastName: userProfile.profile.lastName || '',
                    email: userProfile.profile.email || '',
                    phone: userProfile.profile.phone || '',
                  }
                : {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                  },
              addressBooks: userProfile.addressBooks || [],
            }
          : getInitialUserProfile();
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status.profile = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to fetch user profile';
      });
  },
});

export const productReducer = productSlice.reducer;
export const messageReducer = messageSlice.reducer;
export const accountReducer = accountSlice.reducer;
export const { setAccount, setProfile, setAddressBook, resetAccount } = accountSlice.actions;
