import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import type { Address } from '../../../shared/types/address';
import {
  addAddressAsyncAction,
  deleteAddressAsyncAction,
  updateAddressAsyncAction,
} from '../store/userProfileAsyncAction';

const useAddress = () => {
  const dispatch = useAppDispatch();

  // Add new address
  const addAddress = useCallback(
    async (newAddress: Address) => {
      await dispatch(addAddressAsyncAction({ newAddress }));
    },
    [dispatch],
  );

  // Delete existing address
  const deleteAddress = useCallback(
    async (addressId: string) => {
      await dispatch(deleteAddressAsyncAction(addressId));
    },
    [dispatch],
  );

  // Update existing address
  const updateAddress = useCallback(
    async (addressId: string, newAddress: Address) => {
      await dispatch(updateAddressAsyncAction({ addressId, newAddress }));
    },
    [dispatch],
  );

  return {
    addAddress,
    deleteAddress,
    updateAddress,
  };
};

export { useAddress };
