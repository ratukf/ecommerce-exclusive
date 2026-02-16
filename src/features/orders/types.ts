//  Order's type
export interface Orders {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'failed';
  createdAt: string;
}

// Item's type
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrls: string;
}

// Order's status type
export interface OrdersState {
  orders: Orders;
}

// Empty orders
export const emptyOrders: Orders = {
  id: '',
  userId: '',
  items: [
    {
      productId: '',
      name: '',
      price: 0,
      quantity: 0,
      imageUrls: '',
    },
  ],
  subtotal: 0,
  shippingCost: 0,
  totalAmount: 0,
  status: 'pending',
  paymentStatus: 'unpaid',
  createdAt: '',
};
