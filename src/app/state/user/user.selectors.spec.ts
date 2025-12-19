import { selectOrdersByStatus } from './user.selectors';
import { OrderSummary } from '../../account/orders/order.models';

describe('User selectors', () => {
  describe('selectOrdersByStatus', () => {
    it('should return only orders matching the given status', () => {
      const orders: OrderSummary[] = [
        {
          id: '1',
          date: '2024-01-01',
          status: 'shipped',
          total: 100,
        },
        {
          id: '2',
          date: '2024-01-02',
          status: 'pending',
          total: 50,
        },
        {
          id: '3',
          date: '2024-01-03',
          status: 'shipped',
          total: 200,
        },
      ];

      const result = selectOrdersByStatus('shipped').projector(orders);

      expect(result.length).toBe(2);
      expect(result.every((o) => o.status === 'shipped')).toBeTrue();
    });
  });
});
