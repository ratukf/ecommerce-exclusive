import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { signUpGithub, signUpGoogle } from '../store/authAsyncAction';

const useOAuth = () => {
  const dispatch = useAppDispatch();
  const loginGoogle = useCallback(async () => {
    await dispatch(signUpGoogle()).unwrap();
  }, [dispatch]);
  const loginGithub = useCallback(async () => {
    await dispatch(signUpGithub()).unwrap();
  }, [dispatch]);
  return {
    loginGoogle,
    loginGithub,
  };
};

export { useOAuth };
