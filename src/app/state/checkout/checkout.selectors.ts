import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CheckoutState } from './checkout.models';

export const selectCheckoutState =
  createFeatureSelector<CheckoutState>('checkout');

export const selectCheckoutAddress = createSelector(
  selectCheckoutState,
  state => state.address
);
