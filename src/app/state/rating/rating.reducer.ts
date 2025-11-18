import { createReducer, on } from '@ngrx/store';
import * as Rating from './rating.actions';
import { RatingResult } from './rating.models';

export interface RatingState {
  loading: boolean;
  error: string | null;
  result: RatingResult | null;   // ⭐ this holds the rating data
}

export const initialRatingState: RatingState = {
  loading: false,
  error: null,
  result: null
};

export const ratingReducer = createReducer(
  initialRatingState,

  // Before loading → clear old result
  on(Rating.loadRating, (state) => ({
    ...state,
    loading: true,
    error: null,
    result: null
  })),

  // Rating retrieved successfully → store inside result object
  on(Rating.loadRatingSuccess, (state, { productId, avg_rating, count }) => ({
    ...state,
    loading: false,
    error: null,
    result: { productId, avg_rating, count }    // ⭐ important fix
  })),

  // Failure → store error, clear result
  on(Rating.loadRatingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    result: null
  }))
);
