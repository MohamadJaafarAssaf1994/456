import { cartReducer } from './cart.reducer';
import { initialCartState, CartState } from './cart.models';
import * as CartActions from './cart.actions';
import { Product } from '../products/products.models';

describe('Cart Reducer', () => {
  const productA: Product = {
    id: 1,
    name: 'Laptop',
    price: 1000,
    created_at: '2025-01-01',
  };

  const productB: Product = {
    id: 2,
    name: 'Mouse',
    price: 50,
    created_at: '2025-01-02',
  };

  it('should add item and update count and totalPrice', () => {
    const action = CartActions.addItem({
      product: productA,
      quantity: 2,
    });

    const state = cartReducer(initialCartState, action);

    expect(state.items.length).toBe(1);
    expect(state.count).toBe(2);
    expect(state.totalPrice).toBe(2000);
  });

  it('should increase quantity if product already exists', () => {
    const startState: CartState = {
      ...initialCartState,
      items: [{ product: productA, quantity: 1 }],
      count: 1,
      totalPrice: 1000,
    };

    const action = CartActions.addItem({
      product: productA,
      quantity: 2,
    });

    const state = cartReducer(startState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.count).toBe(3);
    expect(state.totalPrice).toBe(3000);
  });

  it('should update quantity and recalculate totals', () => {
    const startState: CartState = {
      ...initialCartState,
      items: [
        { product: productA, quantity: 1 },
        { product: productB, quantity: 2 },
      ],
      count: 3,
      totalPrice: 1100,
    };

    const action = CartActions.updateQuantity({
      productId: 2,
      quantity: 1,
    });

    const state = cartReducer(startState, action);

    expect(state.items.find((i) => i.product.id === 2)?.quantity).toBe(1);
    expect(state.count).toBe(2);
    expect(state.totalPrice).toBe(1050);
  });

  it('should remove item and recalculate totals', () => {
    const startState: CartState = {
      ...initialCartState,
      items: [
        { product: productA, quantity: 1 },
        { product: productB, quantity: 2 },
      ],
      count: 3,
      totalPrice: 1100,
    };

    const action = CartActions.removeItem({ productId: 1 });

    const state = cartReducer(startState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].product.id).toBe(2);
    expect(state.count).toBe(2);
    expect(state.totalPrice).toBe(100);
  });

  it('should clear cart', () => {
    const startState: CartState = {
      ...initialCartState,
      items: [{ product: productA, quantity: 2 }],
      count: 2,
      totalPrice: 2000,
    };

    const action = CartActions.clearCart();

    const state = cartReducer(startState, action);

    expect(state).toEqual(initialCartState);
  });
});
