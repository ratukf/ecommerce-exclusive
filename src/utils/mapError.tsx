const errorMap: Record<string, string> = {
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password',
  'auth/invalid-email': 'Invalid email',
  'auth/too-many-requests': 'Too many attempts. Try again later',
};

export const mapFirebaseAuthError = (error: unknown): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as any).code === 'string'
  ) {
    return errorMap[(error as any).code] ?? 'Authentication failed';
  }

  return 'Something went wrong';
};
