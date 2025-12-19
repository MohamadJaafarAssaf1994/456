import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.models';

/* =========================
   BASE SELECTOR
   ========================= */

export const selectUserState = createFeatureSelector<UserState>('user');

/* =========================
   PROFILE
   ========================= */

export const selectUserProfile = createSelector(selectUserState, (state) => state.profile);

export const selectUserPreferences = createSelector(
  selectUserProfile,
  (profile) => profile?.preferences,
);

export const selectUserLoading = createSelector(selectUserState, (state) => state.loading);

export const selectUserError = createSelector(selectUserState, (state) => state.error);

/* =========================
   ORDERS
   ========================= */

export const selectUserOrders = createSelector(selectUserState, (state) => state.orders);

export const selectSelectedOrder = createSelector(selectUserState, (state) => state.selectedOrder);

/* =========================
   COMPOSED SELECTOR (REQUIRED)
   ========================= */

export const selectOrdersByStatus = (status: string) =>
  createSelector(selectUserOrders, (orders) => orders.filter((o) => o.status === status));
