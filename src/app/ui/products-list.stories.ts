import type { Meta, StoryObj } from '@storybook/angular';
import { ProductsListComponent } from './products-list.component';

const meta: Meta<ProductsListComponent> = {
  title: 'Shop/Products List',
  component: ProductsListComponent,
  args: {
    items: [
      { id: 1, name: 'Blue Pen', price: 2.5 },
      { id: 2, name: 'Notebook', price: 3.0 }
    ]
  }
};

export default meta;

export const Default: StoryObj<ProductsListComponent> = {};
