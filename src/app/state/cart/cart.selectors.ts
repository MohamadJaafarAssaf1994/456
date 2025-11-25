import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.models';

// ⭐ 1. Base selector (feature key = 'cart')
export const selectCartState =
  createFeatureSelector<CartState>('cart');

// ⭐ 2. Select all cart items
export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

// ⭐ 3. Select total price
export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.totalPrice
);

// ⭐ 4. Select total number of items
export const selectCartCount = createSelector(
  selectCartState,
  (state) => state.count
);

// ⭐ 5. Select quantity for a specific product (optional)
export const selectProductQuantity = (productId: number) =>
  createSelector(selectCartItems, (items) => {
    const found = items.find(i => i.product.id === productId);
    return found ? found.quantity : 0;
  });
