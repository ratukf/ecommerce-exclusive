import { FirebaseError } from 'firebase/app';

export const mapFirebaseAuthError = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Wrong password';
      case 'auth/invalid-email':
        return 'Invalid email';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later';
      default:
        return 'Authentication failed';
    }
  }

  return 'Something went wrong';
};
