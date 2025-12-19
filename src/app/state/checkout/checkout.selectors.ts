import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CheckoutState } from './checkout.models';

/* =========================
   FEATURE STATE
   ========================= */

export const selectCheckoutState = createFeatureSelector<CheckoutState>('checkout');

/* =========================
   ADDRESS
   ========================= */

export const selectCheckoutAddress = createSelector(selectCheckoutState, (state) => state.address);

/* =========================
   PROMO
   ========================= */

export const selectCheckoutPromo = createSelector(selectCheckoutState, (state) => state.promo);

export const selectCheckoutPromoError = createSelector(
  selectCheckoutState,
  (state) => state.promoError,
);
