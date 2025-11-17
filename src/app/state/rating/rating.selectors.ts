import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RatingState } from './rating.reducer';

export const selectRatingState =
  createFeatureSelector<RatingState>('rating');

export const selectRatingLoading = createSelector(
  selectRatingState,
  state => state.loading
);

export const selectRatingError = createSelector(
  selectRatingState,
  state => state.error
);

export const selectRatingResult = createSelector(
  selectRatingState,
  state => ({
    avg_rating: state.avg_rating,
    count: state.count
  })
);
