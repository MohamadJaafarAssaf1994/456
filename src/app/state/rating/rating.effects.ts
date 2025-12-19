import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Rating from './rating.actions';
import { ShopApiService } from '../../services/shop-api.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class RatingEffects {
  private actions$ = inject(Actions);
  private api = inject(ShopApiService);

  loadRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Rating.loadRating),
      mergeMap(({ productId }) =>
        this.api.getRating(productId).pipe(
          map((res) =>
            Rating.loadRatingSuccess({
              productId: res.product_id,
              avg_rating: res.avg_rating,
              count: res.count,
            }),
          ),
          catchError((err) =>
            of(
              Rating.loadRatingFailure({
                error: err?.message ?? 'Error loading rating',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
