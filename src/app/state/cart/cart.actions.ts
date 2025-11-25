import { createAction, props } from '@ngrx/store';
import { Product } from '../products/products.models';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ product: Product; quantity: number }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');
