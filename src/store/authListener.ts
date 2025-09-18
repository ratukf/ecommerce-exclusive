import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../services/firebase';
import { setAccount, resetAccount } from './slice';

export function useAuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setAccount({
            id: user.uid,
            name: user.displayName ?? '',
            email: user.email ?? '',
            phone: user.phoneNumber ?? '',
            createdAt: user.metadata?.creationTime ?? '',
            photoUrl: user.photoURL ?? '',
          }),
        );
      } else {
        dispatch(resetAccount());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
}
