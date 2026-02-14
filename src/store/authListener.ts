import { useEffect } from 'react';
import { auth } from '../services/firebase';
import { setAuth, resetAuth } from './auth.slice';
import { ensureUserProfile } from './authAsyncAction';
import { useAppDispatch } from './hooks';

export function useAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(ensureUserProfile(user));
        dispatch(
          setAuth({
            id: user.uid,
            displayName: user.displayName ?? '',
            email: user.email ?? '',
            phone: user.phoneNumber ?? '',
            createdAt: user.metadata?.creationTime ?? '',
            photoUrl: user.photoURL ?? '',
          }),
        );
      } else {
        dispatch(resetAuth());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
}
