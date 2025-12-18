import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Products from './products.actions';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShopApiService } from '../../services/shop-api.service';
import { Store } from '@ngrx/store';
import { selectProductsQuery } from './products.selectors';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsEffects {

  private actions$ = inject(Actions);
  private api = inject(ShopApiService);
  private store = inject(Store);
  private http = inject(HttpClient);

  /* =========================
     LOAD PRODUCTS
     ========================= */

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Products.loadProducts),
      withLatestFrom(this.store.select(selectProductsQuery)),
      mergeMap(([action, currentQuery]) => {
        const finalQuery = { ...currentQuery, ...action.query };

        return this.api.getProducts(finalQuery).pipe(
          map(({ count, results }) =>
            Products.loadProductsSuccess({ count, results })
          ),
          catchError((err) =>
            of(
              Products.loadProductsFailure({
                error: err?.message ?? 'Error loading products',
              })
            )
          )
        );
      })
    )
  );

  /* =========================
     PRODUCT DETAILS
     ========================= */

  loadProductDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Products.loadProductDetails),
      mergeMap(({ id }) =>
        this.http.get(`/api/products/${id}`).pipe(
          map((product: any) =>
            Products.loadProductDetailsSuccess({ product })
          ),
          catchError((err) =>
            of(
              Products.loadProductDetailsFailure({
                error: err.message || 'Failed to load product',
              })
            )
          )
        )
      )
    )
  );

  /* =========================
     ADMIN – ADD PRODUCT  ✅ NEW
     ========================= */

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Products.addProduct),
      mergeMap(({ name, price }) =>
        this.http.post('/api/admin/products/', { name, price }).pipe(
          map((product: any) =>
            Products.addProductSuccess({ product })
          ),
          catchError((err) =>
            of(
              Products.addProductFailure({
                error: err.message || 'Failed to add product',
              })
            )
          )
        )
      )
    )
  );
}
