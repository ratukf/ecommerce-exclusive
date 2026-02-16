import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { toggleWishlistAsyncAction } from '../store/userProfileAsyncAction';

const useWishlist = () => {
  const dispatch = useAppDispatch();

  // Toggle wishlist
  const toggleWishlist = useCallback(
    async (productId: string) => {
      await dispatch(toggleWishlistAsyncAction(productId));
    },
    [dispatch],
  );

  return {
    toggleWishlist,
  };
};
export { useWishlist };
