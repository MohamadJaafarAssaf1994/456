import { createReducer, on } from '@ngrx/store';
import * as Rating from './rating.actions';

export interface RatingState {
  productId: number | null;
  avg_rating: number | null;
  count: number | null;
  loading: boolean;
  error: string | null;
}

export const initialRatingState: RatingState = {
  productId: null,
  avg_rating: null,
  count: null,
  loading: false,
  error: null
};

export const ratingReducer = createReducer(
  initialRatingState,

  on(Rating.loadRating, (state, { productId }) => ({
    ...state,
    productId,
    loading: true,
    error: null
  })),

  on(Rating.loadRatingSuccess, (state, { productId, avg_rating, count }) => ({
    ...state,
    productId,
    avg_rating,
    count,
    loading: false
  })),

  on(Rating.loadRatingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
