import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
  selectAuth,
  (state) => state.access
);

export const selectIsLoggedIn = createSelector(
  selectAccessToken,
  (access) => !!access
);

export const selectAuthLoading = createSelector(
  selectAuth,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuth,
  (state) => state.error
);
