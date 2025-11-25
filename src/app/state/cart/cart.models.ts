import { Product } from '../products/products.models';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  count: number;
}

export const initialCartState: CartState = {
  items: [],
  totalPrice: 0,
  count: 0
};
