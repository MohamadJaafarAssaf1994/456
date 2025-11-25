import { Routes } from '@angular/router';

import { LoginPageComponent } from './features/auth/login-page.component';
import { ProductsPageComponent } from './features/products/products-page.component';
import { ProductRatingPageComponent } from './features/rating/product-rating-page.component';
import { ProductDetailsPageComponent } from './shop/product-details/product-details-page.component';
import { CartPageComponent } from './shop/cart/cart-page.component';

import { DevIndexComponent } from './dev/dev-index.component';
import { HomeComponent } from './home.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';

import { Step1SummaryComponent } from './shop/checkout/step1-summary.component';
import { Step2AddressComponent } from './shop/checkout/step2-address.component';
import { Step3ConfirmComponent } from './shop/checkout/step3-confirm.component';



export const routes: Routes = [

  // HOME
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // DEV ZONE
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },

  // LOGIN
  { path: 'login', component: LoginPageComponent },

  // SHOP
  { path: 'shop/products', component: ProductsPageComponent },
  { path: 'shop/rating', component: ProductRatingPageComponent },

  // PRODUCT DETAILS
  { path: 'shop/product/:id', component: ProductDetailsPageComponent },

  // CART PAGE
  { path: 'shop/cart', component: CartPageComponent },

  // CHECKOUT STEP 1 (summary)
  { path: 'shop/checkout', component: Step1SummaryComponent },

  { path: 'shop/checkout/address', component: Step2AddressComponent },
  
  { path: 'shop/checkout/confirm', component: Step3ConfirmComponent },


  // FALLBACK
  { path: '**', redirectTo: '/login' },
];
