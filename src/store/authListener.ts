import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../services/firebase';
import { setAuth, resetAuth } from './auth.slice';

export function useAuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
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
