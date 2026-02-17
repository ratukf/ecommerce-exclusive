import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/hooks';
import type { RootState } from '../../../store/store';
import { useCallback } from 'react';
import { fetchPaymentsByUser } from '../store/paymentAsyncAction';

export const useFetchPayments = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useSelector(
    (state: RootState) => state.payment.asyncState.getPayments,
  );
  const payments = useSelector((state: RootState) => state.payment.payments);

  const fetchPayments = useCallback(
    async (userId: string) => {
      return dispatch(fetchPaymentsByUser(userId)).unwrap();
    },
    [dispatch],
  );

  return { fetchPayments, payments, status, error };
};
