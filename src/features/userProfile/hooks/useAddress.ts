import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import type { Address } from '../../../shared/types/address';
import { addAddressAsyncAction, deleteAddressAsyncAction } from '../store/userProfileAsyncAction';

const useAddress = () => {
  const dispatch = useAppDispatch();
  const addAddress = useCallback(
    async (newAddress: Address) => {
      await dispatch(addAddressAsyncAction({ newAddress }));
    },
    [dispatch],
  );

  const deleteAddress = useCallback(
    async (addressId: string) => {
      await dispatch(deleteAddressAsyncAction(addressId));
    },
    [dispatch],
  );
  return {
    addAddress,
    deleteAddress,
  };
};

export { useAddress };
