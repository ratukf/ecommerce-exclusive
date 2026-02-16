import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { updateAuthAsyncAction } from '../store/authAsyncAction';

const useUpdateAuth = () => {
  const dispatch = useAppDispatch();
  const updateAuth = useCallback(
    async (name: string) => {
      await dispatch(updateAuthAsyncAction(name)).unwrap();
    },
    [dispatch],
  );
  return {
    updateAuth,
  };
};

export { useUpdateAuth };
