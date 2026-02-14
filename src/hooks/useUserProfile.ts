import type { Profile } from '../types/userProfile';
import { updateProfileAsyncAction } from '../store/userProfileAsyncAction';
import { useAppDispatch } from '../store/hooks';

export const useUserProfile = () => {
  const appDispatch = useAppDispatch();

  // Update user profile
  const handleUpdateUserProfile = async (id: string, profile: Profile) => {
    try {
      appDispatch(updateProfileAsyncAction({ id, profile }));
    } catch (error) {
      console.error('Failed to update user profile', error);
    } finally {
      console.log('Successfully update user profile');
    }
  };

  return {
    useUpdateUserProfile: {
      updateUserProfile: handleUpdateUserProfile,
    },
  };
};
