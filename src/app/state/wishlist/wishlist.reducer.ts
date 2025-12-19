import { createReducer, on } from '@ngrx/store';
import { initialWishlistState } from './wishlist.models';
import * as WishlistActions from './wishlist.actions';

export const wishlistReducer = createReducer(
  initialWishlistState,

  on(WishlistActions.loadWishlistSuccess, (state, { productIds }) => ({
    ...state,
    productIds,
  })),

  on(WishlistActions.toggleWishlist, (state, { productId }) => {
    const exists = state.productIds.includes(productId);

    return {
      ...state,
      productIds: exists
        ? state.productIds.filter((id) => id !== productId)
        : [...state.productIds, productId],
    };
  }),

  on(WishlistActions.clearWishlist, () => initialWishlistState),
);
