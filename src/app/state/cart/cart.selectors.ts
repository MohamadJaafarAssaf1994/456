import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.models';

// 1. Base selector
export const selectCartState = createFeatureSelector<CartState>('cart');

// 2. Items
export const selectCartItems = createSelector(selectCartState, (state) => state.items);

// 3. Total price
export const selectCartTotal = createSelector(selectCartState, (state) => state.totalPrice);

// 4. Total quantity
export const selectCartCount = createSelector(selectCartState, (state) => state.count);

// 5. Quantity for one product
export const selectProductQuantity = (productId: number) =>
  createSelector(selectCartItems, (items) => {
    const found = items.find((i) => i.product.id === productId);
    return found ? found.quantity : 0;
  });

// 6. REQUIRED by assignment/tests
export const selectCartTotalItems = createSelector(selectCartCount, (count) => count);
