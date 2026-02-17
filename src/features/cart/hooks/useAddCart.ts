import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/hooks';
import type { RootState } from '../../../store/store';
import { useCallback } from 'react';
import type { Item } from '../type';
import { addItemToCart } from '../store/cartAsyncAction';

export const useAddCart = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useSelector((state: RootState) => state.cart.asyncState.addCart);

  const addItem = useCallback(
    async (userId: string, item: Item) => {
      return dispatch(addItemToCart({ userId, item })).unwrap();
    },
    [dispatch],
  );

  return { addItem, status, error };
};
