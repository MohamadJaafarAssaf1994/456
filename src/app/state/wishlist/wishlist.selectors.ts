import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist.models';
import { selectProductsList } from '../products/products.selectors';
import { Product } from '../products/products.models';

export const selectWishlistState = createFeatureSelector<WishlistState>('wishlist');

export const selectWishlistProductIds = createSelector(
  selectWishlistState,
  (state) => state.productIds,
);

export const selectIsInWishlist = (productId: number) =>
  createSelector(selectWishlistProductIds, (ids) => ids.includes(productId));

export const selectWishlistCount = createSelector(selectWishlistProductIds, (ids) => ids.length);

export const selectWishlistProducts = createSelector(
  selectWishlistProductIds,
  selectProductsList,
  (ids, products): Product[] => products.filter((p) => ids.includes(p.id)),
);
