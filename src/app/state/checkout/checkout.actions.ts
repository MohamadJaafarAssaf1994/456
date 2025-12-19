import { createAction, props } from '@ngrx/store';
import { CheckoutAddress, PromoResult } from './checkout.models';

/* =========================
   ADDRESS
   ========================= */

export const saveAddress = createAction(
  '[Checkout] Save Address',
  props<{ address: CheckoutAddress }>(),
);

export const clearCheckout = createAction('[Checkout] Clear Checkout');

/* =========================
   PROMO CODES
   ========================= */

export const applyPromo = createAction('[Checkout] Apply Promo', props<{ code: string }>());

export const applyPromoSuccess = createAction(
  '[Checkout] Apply Promo Success',
  props<{ promo: PromoResult }>(),
);

export const applyPromoFailure = createAction(
  '[Checkout] Apply Promo Failure',
  props<{ error: string }>(),
);
