import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import type { Profile } from '../../../shared/types/userProfile';
import { updateProfileAsyncAction } from '../store/userProfileAsyncAction';

const useUpdateUserProfile = () => {
  const dispatch = useAppDispatch();
  const updateUserProfile = useCallback(
    async (id: string, profile: Profile) => {
      await dispatch(updateProfileAsyncAction({ id, profile })).unwrap();
    },
    [dispatch],
  );
  return {
    updateUserProfile,
  };
};

export { useUpdateUserProfile };
