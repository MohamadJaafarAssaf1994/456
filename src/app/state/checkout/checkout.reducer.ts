import { createReducer, on } from '@ngrx/store';
import * as CheckoutActions from './checkout.actions';
import { CheckoutState, initialCheckoutState } from './checkout.models';

export const checkoutReducer = createReducer(
  initialCheckoutState,

  /* =========================
     ADDRESS
     ========================= */

  on(CheckoutActions.saveAddress, (state, { address }) => ({
    ...state,
    address,
  })),

  /* =========================
     PROMO CODES
     ========================= */

  on(CheckoutActions.applyPromo, (state) => ({
    ...state,
    promoError: null, // reset error on new attempt
  })),

  on(CheckoutActions.applyPromoSuccess, (state, { promo }) => ({
    ...state,
    promo,
    promoError: null,
  })),

  on(CheckoutActions.applyPromoFailure, (state, { error }) => ({
    ...state,
    promoError: error,
  })),

  /* =========================
     CLEAR
     ========================= */

  on(CheckoutActions.clearCheckout, () => initialCheckoutState),
);
