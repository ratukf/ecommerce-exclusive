import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { logOutAsyncAction } from '../store/authAsyncAction';

const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    await dispatch(logOutAsyncAction(undefined)).unwrap();
  }, [dispatch]);

  return { logout };
};

export { useLogout };
