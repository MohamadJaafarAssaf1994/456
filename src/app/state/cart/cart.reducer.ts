import { createReducer, on } from '@ngrx/store';
import { CartState, CartItem, initialCartState } from './cart.models';
import * as CartActions from './cart.actions';

function calculateTotals(items: CartItem[]) {
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalPrice, count };
}

export const cartReducer = createReducer(
  initialCartState,

  // ADD ITEM
  on(CartActions.addItem, (state, { product, quantity }) => {
    const existing = state.items.find((i) => i.product.id === product.id);

    let newItems: CartItem[];

    if (existing) {
      // Increase quantity
      newItems = state.items.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
      );
    } else {
      // Add new item
      newItems = [...state.items, { product, quantity }];
    }

    const { totalPrice, count } = calculateTotals(newItems);

    return {
      ...state,
      items: newItems,
      totalPrice,
      count,
    };
  }),

  // REMOVE ITEM
  on(CartActions.removeItem, (state, { productId }) => {
    const newItems = state.items.filter((i) => i.product.id !== productId);

    const { totalPrice, count } = calculateTotals(newItems);

    return {
      ...state,
      items: newItems,
      totalPrice,
      count,
    };
  }),

  // UPDATE QUANTITY
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    const newItems = state.items.map((i) => (i.product.id === productId ? { ...i, quantity } : i));

    const { totalPrice, count } = calculateTotals(newItems);

    return {
      ...state,
      items: newItems,
      totalPrice,
      count,
    };
  }),

  // CLEAR CART
  on(CartActions.clearCart, () => initialCartState),
);
