import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Products from './products.actions';
import { ShopApiService } from '../../services/shop-api.service';
import { catchError, map, switchMap, withLatestFrom, of } from 'rxjs';
import { selectProductsQuery } from './products.selectors';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private api = inject(ShopApiService);
  private store = inject(Store);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Products.loadProducts),
      withLatestFrom(this.store.select(selectProductsQuery)),
      switchMap(([action, currentQuery]) => {
        const query = { ...currentQuery, ...action.query };

        return this.api.getProducts(query).pipe(
          map(({ count, results }) =>
            Products.loadProductsSuccess({ count, results })
          ),
          catchError(err =>
            of(Products.loadProductsFailure({ error: err?.message ?? 'Error loading products' }))
          )
        );
      })
    )
  );
}
