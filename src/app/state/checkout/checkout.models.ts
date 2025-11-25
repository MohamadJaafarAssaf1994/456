export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zip: string;
}

export interface CheckoutState {
  address: CheckoutAddress | null;
}

export const initialCheckoutState: CheckoutState = {
  address: null
};
