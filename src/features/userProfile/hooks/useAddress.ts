import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import type { AddressBooks } from '../../../shared/types/address';
import { saveAddressBooksAsyncAction } from '../store/userProfileAsyncAction';

const useAddress = () => {
  const dispatch = useAppDispatch();
  const saveAddressBooks = useCallback(
    async (id: string, addressBooks: AddressBooks) => {
      await dispatch(saveAddressBooksAsyncAction({ id, addressBooks }));
    },
    [dispatch],
  );
  return {
    saveAddressBooks,
  };
};

export { useAddress };
