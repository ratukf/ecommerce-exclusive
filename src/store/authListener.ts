import { useEffect } from 'react';
import { auth } from '../services/firebase';
import { setAuth, resetAuth } from '../features/auth/store/auth.slice';
import { useAppDispatch } from './hooks';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { useGetUser } from '../features/userProfile/hooks/useGetUser';

export function useAuthListener() {
  const dispatch = useAppDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile);
  const { getUser } = useGetUser();

  // Listen while log in / log out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
        // Listen when user is logged in but userProfile state is empty
        if (!userProfile.id) {
          await getUser();
        }
      } else {
        dispatch(resetAuth());
      }
    });
    return () => unsubscribe();
  }, [dispatch, getUser, userProfile.id]);
}
