import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { getUserProfile } from '../store/userProfileAsyncAction';

const useGetUser = () => {
  const dispatch = useAppDispatch();
  const getUser = useCallback(async () => {
    await dispatch(getUserProfile()).unwrap();
  }, [dispatch]);
  return {
    getUser,
  };
};

export { useGetUser };
