import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WishlistActions from './wishlist.actions';
import { tap } from 'rxjs/operators';

const STORAGE_KEY = 'wishlist';

@Injectable()
export class WishlistEffects {
  constructor(private actions$: Actions) {}

  // 🔹 Save wishlist to localStorage
  saveWishlist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WishlistActions.toggleWishlist),
        tap((action) => {
          const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

          const updated = existing.includes(action.productId)
            ? existing.filter((id: number) => id !== action.productId)
            : [...existing, action.productId];

          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }),
      ),
    { dispatch: false },
  );
}
