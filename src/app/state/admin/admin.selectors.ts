import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.models';

/* =========================
   FEATURE SELECTOR
   ========================= */

export const selectAdminState =
  createFeatureSelector<AdminState>('admin');

/* =========================
   BASIC SELECTORS
   ========================= */

export const selectAdminStats = createSelector(
  selectAdminState,
  (state) => state.stats
);

export const selectAdminLoading = createSelector(
  selectAdminState,
  (state) => state.loading
);

export const selectAdminError = createSelector(
  selectAdminState,
  (state) => state.error
);

/* =========================
   DERIVED SELECTORS (OPTIONAL)
   ========================= */

// Useful for cards
export const selectAdminTotals = createSelector(
  selectAdminStats,
  (stats) =>
    stats
      ? {
          totalUsers: stats.totalUsers,
          totalOrders: stats.totalOrders,
          totalRevenue: stats.totalRevenue,
        }
      : null
);

// Useful for tables
export const selectAdminTopProducts = createSelector(
  selectAdminStats,
  (stats) => stats?.topProducts ?? []
);

export const selectAdminRecentOrders = createSelector(
  selectAdminStats,
  (stats) => stats?.recentOrders ?? []
);
