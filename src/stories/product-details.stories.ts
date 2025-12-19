import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProductDetailsPageComponent } from '../app/shop/product-details/product-details-page.component';

import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { productsReducer } from '../app/state/products/products.reducer';
import { cartReducer } from '../app/state/cart/cart.reducer';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

export default {
  title: 'Shop/Product Details',
  component: ProductDetailsPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ProductDetailsPageComponent,
        RouterTestingModule,
        StoreModule.forRoot({
          products: productsReducer,
          cart: cartReducer,
        }),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
            params: of({ id: 1 }),
          },
        },
      ],
    }),
  ],
} as Meta<ProductDetailsPageComponent>;

// ⭐ Story with name "Example"
export const Example: StoryObj<ProductDetailsPageComponent> = {};
