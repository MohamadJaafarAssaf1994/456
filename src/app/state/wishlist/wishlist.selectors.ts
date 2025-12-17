import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist.models';

export const selectWishlistState =
  createFeatureSelector<WishlistState>('wishlist');

export const selectWishlistProductIds = createSelector(
  selectWishlistState,
  state => state.productIds
);

export const selectIsInWishlist = (productId: number) =>
  createSelector(
    selectWishlistProductIds,
    ids => ids.includes(productId)
  );

export const selectWishlistCount = createSelector(
  selectWishlistProductIds,
  ids => ids.length
);
