export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zip: string;
}

/* =========================
   PROMO / DISCOUNT RESULT
   ========================= */

export interface PromoResult {
  itemsTotal: number;
  discount: number;
  shipping: number;
  taxes: number;
  grandTotal: number;
  appliedPromos: string[];
}

/* =========================
   CHECKOUT STATE
   ========================= */

export interface CheckoutState {
  address: CheckoutAddress | null;

  // ✅ Promo system
  promo: PromoResult | null;
  promoError: string | null;
}

export const initialCheckoutState: CheckoutState = {
  address: null,

  // ✅ Promo initial values
  promo: null,
  promoError: null,
};
