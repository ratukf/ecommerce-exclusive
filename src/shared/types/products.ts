// --- Product's type ---

// Products' main type
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

// Products' review
export interface Review {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  date: string;
}

// Products' variant
export interface Variant {
  id: string;
  name: string;
  price: number;
  stock: number;
  color: string;
}

// Product state for state management
export interface ProductState {
  products: Product[];
  productDetail: Product | null;
  loading: boolean;
  error: string | null;
}
