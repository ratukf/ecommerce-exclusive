// --- Auth's type ---

// Auth's type
export interface Auth {
  id: string;
  email: string;
  displayName: string;
  phone: string;
  photoUrl: string;
  createdAt: string;
}

// Auth state for state management
export interface AuthState {
  auth: Auth;
  loading: boolean;
  error: string | null;
}
