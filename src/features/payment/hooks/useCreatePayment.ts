import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/hooks';
import type { RootState } from '../../../store/store';
import { useCallback } from 'react';
import type { PaymentInput } from '../type';
import { createPayment } from '../store/paymentAsyncAction';

export const useCreatePayment = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useSelector(
    (state: RootState) => state.payment.asyncState.createPayment,
  );
  const currentPayment = useSelector((state: RootState) => state.payment.currentPayment);

  const submitPayment = useCallback(
    async (input: PaymentInput) => {
      return dispatch(createPayment(input)).unwrap();
    },
    [dispatch],
  );

  return { submitPayment, currentPayment, status, error };
};
