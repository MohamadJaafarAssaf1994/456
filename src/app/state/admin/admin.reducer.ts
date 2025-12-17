import { createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';
import { AdminState, initialAdminState } from './admin.models';

/* =========================
   ADMIN REDUCER
   ========================= */

export const adminReducer = createReducer(
  initialAdminState,

  /* LOAD STATS */
  on(AdminActions.loadAdminStats, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  /* LOAD SUCCESS */
  on(AdminActions.loadAdminStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
    loading: false,
  })),

  /* LOAD FAILURE */
  on(AdminActions.loadAdminStatsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
