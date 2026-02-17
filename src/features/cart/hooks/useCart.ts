import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/hooks';
import type { RootState } from '../../../store/store';
import { fetchCart } from '../store/cartAsyncAction';
import { auth } from '../../../services/firebase';

export const useCart = () => {
  const uid = auth.currentUser?.uid;
  const dispatch = useAppDispatch();
  const { status, error } = useSelector((state: RootState) => state.cart.asyncState.getCart);
  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (uid) {
      dispatch(fetchCart(uid));
    }
  }, [dispatch, uid]);

  return { cart, status, error };
};
