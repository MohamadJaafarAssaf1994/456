import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// 1️⃣ Select the entire auth feature state
export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

// 2️⃣ Select the username
export const selectUsername = createSelector(
  selectAuthState,
  (state) => state.username
);

// 3️⃣ Optional: select login status
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn
);

// 4️⃣ Optional: select auth error
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
