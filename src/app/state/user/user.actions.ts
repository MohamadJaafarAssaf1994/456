import { createAction, props } from '@ngrx/store';
import { OrderSummary, OrderDetails } from '../../../app/account/orders/order.models';

/* =========================
   PROFILE
   ========================= */

// Load profile
export const loadUserProfile = createAction(
  '[User] Load Profile'
);

export const loadUserProfileSuccess = createAction(
  '[User] Load Profile Success',
  props<{ profile: any }>()   // you can strongly type later
);

export const loadUserProfileFailure = createAction(
  '[User] Load Profile Failure',
  props<{ error: string }>()
);

// Update profile / preferences
export const updateUserProfile = createAction(
  '[User] Update Profile',
  props<{ changes: Partial<any> }>()
);

export const updateUserProfileSuccess = createAction(
  '[User] Update Profile Success',
  props<{ profile: any }>()
);

export const updateUserProfileFailure = createAction(
  '[User] Update Profile Failure',
  props<{ error: string }>()
);

/* =========================
   ORDERS
   ========================= */

// Load user orders
export const loadUserOrders = createAction(
  '[User] Load Orders'
);

export const loadUserOrdersSuccess = createAction(
  '[User] Load Orders Success',
  props<{ orders: OrderSummary[] }>()
);

export const loadUserOrdersFailure = createAction(
  '[User] Load Orders Failure',
  props<{ error: string }>()
);

// Load order details
export const loadOrderDetails = createAction(
  '[User] Load Order Details',
  props<{ id: string }>()
);

export const loadOrderDetailsSuccess = createAction(
  '[User] Load Order Details Success',
  props<{ order: OrderDetails }>()
);

export const loadOrderDetailsFailure = createAction(
  '[User] Load Order Details Failure',
  props<{ error: string }>()
);

export const addUserOrder = createAction(
  '[User] Add Order',
  props<{ order: any }>()
);


/* =========================
   CLEANUP
   ========================= */

// Clear user data (on logout)
export const clearUser = createAction(
  '[User] Clear User State'
);
