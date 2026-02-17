import type { AsyncState } from '../../shared/types/asyncStatus';

// Cart's type
export interface Cart {
  userId: string;
  item: Item[];
}

// Cart's item's type
export interface Item {
  productId: string;
  name: string;
  quantity: number;
  imageUrls: string;
}

export interface CartState {
  cart: Cart | null;
  asyncState: {
    getCart: AsyncState;
    addCart: AsyncState;
  };
}
