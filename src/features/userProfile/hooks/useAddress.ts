import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import type { Address } from '../../../shared/types/address';
import { addAddressAsyncAction } from '../store/userProfileAsyncAction';

const useAddress = () => {
  const dispatch = useAppDispatch();
  const addAddress = useCallback(
    async (newAddress: Address) => {
      await dispatch(addAddressAsyncAction({ newAddress }));
    },
    [dispatch],
  );
  return {
    addAddress,
  };
};

export { useAddress };
