import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { signUp } from '../store/authAsyncAction';

const useSignup = () => {
  const dispatch = useAppDispatch();
  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      await dispatch(signUp({ name, email, password })).unwrap();
    },
    [dispatch],
  );
  return {
    signup,
  };
};

export { useSignup };
