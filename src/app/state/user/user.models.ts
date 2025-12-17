import { OrderSummary, OrderDetails } from '../../account/orders/order.models';

export interface UserState {
  profile: {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    defaultAddress?: any;
    preferences: {
      newsletter: boolean;
      defaultMinRating?: number;
    };
  } | null;

  orders: OrderSummary[];              // list page
  selectedOrder: OrderDetails | null;  // details page ✅

  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  profile: null,
  orders: [],
  selectedOrder: null,                 // ✅ REQUIRED
  loading: false,
  error: null,
};
