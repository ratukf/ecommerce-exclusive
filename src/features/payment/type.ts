import type { AsyncState } from '../../shared/types/asyncStatus';
import type { OrderItem } from '../orders/types';

export type PaymentMethod = 'bank_transfer' | 'credit_card' | 'e_wallet' | 'cod';

export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';

export interface Payment {
  id: string;
  userId: string;
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type PaymentInput = Omit<Payment, 'id' | 'status' | 'createdAt'>;

export interface PaymentState {
  payments: Payment[];
  currentPayment: Payment | null;
  asyncState: {
    createPayment: AsyncState;
    getPayments: AsyncState;
    updatePaymentStatus: AsyncState;
  };
}

export const emptyPayment: Payment = {
  id: '',
  userId: '',
  orderId: '',
  items: [],
  subtotal: 0,
  shippingCost: 0,
  totalAmount: 0,
  method: 'bank_transfer',
  status: 'pending',
  shippingAddress: {
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  createdAt: '',
};
