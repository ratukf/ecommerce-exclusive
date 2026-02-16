import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { getOrdersAsyncAction } from '../store/ordersAsyncActions';

const useOrder = () => {
  const dispatch = useAppDispatch();
  const getOrders = useCallback(async () => {
    await dispatch(getOrdersAsyncAction()).unwrap();
  }, [dispatch]);
  return { getOrders };
};

export { useOrder };
