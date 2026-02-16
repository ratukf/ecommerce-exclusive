// --- Message Slice ---

// Message's type
export interface Message {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Message state for state management
export interface MessageState {
  loading: boolean;
  error: string | null;
}
