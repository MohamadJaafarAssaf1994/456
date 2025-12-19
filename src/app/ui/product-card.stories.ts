import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';

const meta: Meta<ProductCardComponent> = {
  title: 'Shop/Product Card',
  component: ProductCardComponent,
  args: {
    name: 'Blue Pen',
    price: 2.5,
    created_at: '2025-02-18',
    avgRating: 4.3,
  },
};

export default meta;

export const Default: StoryObj<ProductCardComponent> = {};
