import { useEffect } from 'react';
import { auth } from '../services/firebase';
import { setAuth, resetAuth } from '../features/auth/store/auth.slice';
import { useAppDispatch } from './hooks';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { useGetUser } from '../features/userProfile/hooks/useGetUser';
import { ensureUserProfileService } from '../features/auth/service/authService';
import { useNavigate } from 'react-router';

export function useAuthListener() {
  const nav = useNavigate();
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
        // If user profile not exist, create one
        await ensureUserProfileService(user);

        // Listen when user is logged in but userProfile state is empty
        if (!userProfile.id) {
          await getUser();
        }

        // Scroll to top and redirect after log in / sign up
        if (location.pathname === '/login' || location.pathname === '/signup') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const timer = setTimeout(() => nav('/'), 500);
          return () => clearTimeout(timer);
        }
      } else {
        dispatch(resetAuth());
      }
    });
    return () => unsubscribe();
  }, [dispatch, getUser, userProfile.id]);
}
