import { createAction, props } from '@ngrx/store';

export const loadWishlist = createAction('[Wishlist] Load');

export const loadWishlistSuccess = createAction(
  '[Wishlist] Load Success',
  props<{ productIds: number[] }>()
);

export const toggleWishlist = createAction(
  '[Wishlist] Toggle Product',
  props<{ productId: number }>()
);

export const clearWishlist = createAction('[Wishlist] Clear');


