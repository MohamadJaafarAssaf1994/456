import { createAction, props } from '@ngrx/store';
import { CheckoutAddress } from './checkout.models';

export const saveAddress = createAction(
  '[Checkout] Save Address',
  props<{ address: CheckoutAddress }>()
);

export const clearCheckout = createAction('[Checkout] Clear Checkout');
