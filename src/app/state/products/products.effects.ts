import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Products from './products.actions';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShopApiService } from '../../services/shop-api.service';
import { Store } from '@ngrx/store';
import { selectProductsQuery } from './products.selectors';

@Injectable()
export class ProductsEffects {

  private actions$ = inject(Actions);
  private api = inject(ShopApiService);
  private store = inject(Store);

  /** 
   * Load products from MSW API with filters
   */
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Products.loadProducts),

      // Get latest query from store
      withLatestFrom(this.store.select(selectProductsQuery)),

      // Merge old + new query
      mergeMap(([action, currentQuery]) => {
        const finalQuery = { ...currentQuery, ...action.query };

        return this.api.getProducts(finalQuery).pipe(
          map(({ count, results }) =>
            Products.loadProductsSuccess({ count, results })
          ),
          catchError((err) =>
            of(
              Products.loadProductsFailure({
                error: err?.message ?? 'Error loading products'
              })
            )
          )
        );
      })
    )
  );
}
