import { useAppDispatch } from '../../../store/hooks';
import { signIn } from '../store/authAsyncAction';
import { useCallback } from 'react';

const useLogin = () => {
  const dispatch = useAppDispatch();

  const login = useCallback(
    async (email: string, password: string) => {
      await dispatch(signIn({ email, password })).unwrap();
    },
    [dispatch],
  );

  return {
    login,
  };
};

export { useLogin };
