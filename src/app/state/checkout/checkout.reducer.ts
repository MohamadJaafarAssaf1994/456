import { createReducer, on } from '@ngrx/store';
import { saveAddress, clearCheckout } from './checkout.actions';
import { CheckoutState, initialCheckoutState } from './checkout.models';

export const checkoutReducer = createReducer(
  initialCheckoutState,

  on(saveAddress, (state, { address }) => ({
    ...state,
    address
  })),

  on(clearCheckout, () => initialCheckoutState),
);
