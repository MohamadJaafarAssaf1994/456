import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as CheckoutActions from './checkout.actions';
import { selectCartItems } from '../cart/cart.selectors';
import { PromoResult } from './checkout.models';

@Injectable()
export class CheckoutEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);

  /* =========================
     APPLY PROMO CODE
     ========================= */

  applyPromo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.applyPromo),
      withLatestFrom(this.store.select(selectCartItems)),
      mergeMap(([{ code }, items]) =>
        this.http
          .post<PromoResult>('/api/cart/apply-promo/', {
            items,
            code,
          })
          .pipe(
            map((promo) =>
              CheckoutActions.applyPromoSuccess({ promo })
            ),
            catchError((err) =>
              of(
                CheckoutActions.applyPromoFailure({
                  error:
                    err?.error?.message ||
                    err.message ||
                    'Invalid promo code',
                })
              )
            )
          )
      )
    )
  );
}
