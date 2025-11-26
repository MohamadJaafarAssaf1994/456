import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CartIconComponent } from '../app/shop/cart/cart-icon.component';

import { StoreModule } from '@ngrx/store';
import { cartReducer } from '../app/state/cart/cart.reducer';

import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'Shop/Cart Icon',
  component: CartIconComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CartIconComponent,

        //  mock router
        RouterTestingModule.withRoutes([]),

        //  real NgRx store (classic mode)
        StoreModule.forRoot({
          cart: cartReducer,
        }),
      ],
    })
  ]
} as Meta<CartIconComponent>;

export const Default: StoryObj<CartIconComponent> = {
  args: {},
};
