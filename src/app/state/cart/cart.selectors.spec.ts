import { selectCartTotalItems } from './cart.selectors';
import { CartState } from './cart.models';

describe('Cart Selectors', () => {
  const productA = {
    id: 1,
    name: 'Laptop',
    price: 1000,
    created_at: '2025-01-01',
  };

  const productB = {
    id: 2,
    name: 'Mouse',
    price: 50,
    created_at: '2025-01-01',
  };

  const cartState: CartState = {
    items: [
      { product: productA, quantity: 2 },
      { product: productB, quantity: 3 },
    ],
    count: 5,
    totalPrice: 1150,
  };

  it('should return total number of items in cart', () => {
    const result = selectCartTotalItems({
      cart: cartState,
    } as any);

    expect(result).toBe(5);
  });
});
