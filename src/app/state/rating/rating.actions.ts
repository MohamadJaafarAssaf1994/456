import { createAction, props } from '@ngrx/store';

export const loadRating = createAction(
  '[Rating] Load Rating',
  props<{ productId: number }>()
);

export const loadRatingSuccess = createAction(
  '[Rating] Load Rating Success',
  props<{ productId: number; avg_rating: number; count: number }>()
);

export const loadRatingFailure = createAction(
  '[Rating] Load Rating Failure',
  props<{ error: string }>()
);
