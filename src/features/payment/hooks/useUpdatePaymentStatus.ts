import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/hooks';
import type { RootState } from '../../../store/store';
import { useCallback } from 'react';
import type { Payment } from '../type';
import { updatePaymentStatus } from '../store/paymentAsyncAction';

export const useUpdatePaymentStatus = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useSelector(
    (state: RootState) => state.payment.asyncState.updatePaymentStatus,
  );

  const changeStatus = useCallback(
    async (paymentId: string, status: Payment['status']) => {
      return dispatch(updatePaymentStatus({ paymentId, status })).unwrap();
    },
    [dispatch],
  );

  return { changeStatus, status, error };
};
