import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { initialUserState } from './user.models';

export const userReducer = createReducer(
  initialUserState,

  /* =========================
     PROFILE
     ========================= */

  on(UserActions.loadUserProfile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loadUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false,
  })),

  on(UserActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.updateUserProfile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.updateUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false,
  })),

  on(UserActions.updateUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /* =========================
     ORDERS LIST
     ========================= */

  on(UserActions.loadUserOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loadUserOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
  })),

  on(UserActions.loadUserOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /* =========================
     ORDER DETAILS
     ========================= */

  on(UserActions.loadOrderDetails, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedOrder: null, // optional but clean (avoid showing old details)
  })),

  on(UserActions.loadOrderDetailsSuccess, (state, { order }) => ({
    ...state,
    selectedOrder: order,
    loading: false,
  })),

  on(UserActions.loadOrderDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.addUserOrder, (state, { order }) => ({
    ...state,
    orders: [
      {
        id: order.id,
        date: order.date,
        status: order.status,
        total: order.total,
      },
      ...state.orders,
    ],
    selectedOrder: order, // keep full details here
  })),

  /* =========================
     CLEANUP
     ========================= */

  on(UserActions.clearUser, () => initialUserState),
);
