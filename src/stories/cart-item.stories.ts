import { Meta, StoryObj } from '@storybook/angular';
import { CartItemComponent } from '../app/shop/cart/cart-item.component';

export default {
  title: 'Shop/Cart Item',
  component: CartItemComponent,
} as Meta<CartItemComponent>;

export const Default: StoryObj<CartItemComponent> = {
  args: {
    item: {
      product: {
        id: 1,
        name: 'Blue Pen',
        price: 2.5,
        created_at: '2025-01-01',
      },
      quantity: 2,
    },
  },
};
