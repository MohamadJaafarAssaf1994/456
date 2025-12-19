import { selectWishlistProducts } from './wishlist.selectors';
import { Product } from '../products/products.models';

describe('selectWishlistProducts', () => {
  it('should return products that are in wishlist', () => {
    const products: Product[] = [
      { id: 1, name: 'Laptop', price: 1000, created_at: '2024-01-01' },
      { id: 2, name: 'Mouse', price: 50, created_at: '2024-01-02' },
      { id: 3, name: 'Keyboard', price: 120, created_at: '2024-01-03' },
    ];

    const wishlistIds = [1, 3];

    const result = selectWishlistProducts.projector(wishlistIds, products);

    expect(result.length).toBe(2);
    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });
});
