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
import { OrderSuccessComponent } from './shop/checkout/order-success.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


import { cartNotEmptyGuard } from './shop/checkout/cart-not-empty.guard';
import { authGuard } from './account/account-auth.guard';

import { AccountProfilePageComponent } from './account/profile/account-profile-page.component'
import { AccountOrdersPageComponent } from './account/orders/account-orders-page.component';
import { AccountOrderDetailsPageComponent } from './account/orders/account-order-details-page.component';
import { WishlistPageComponent } from './shop/wishlist/wishlist-page.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';


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

  // SHOP MAIN PAGES
  { path: 'shop/products', component: ProductsPageComponent },
  { path: 'shop/rating', component: ProductRatingPageComponent },

  // PRODUCT DETAILS
  { path: 'shop/product/:id', component: ProductDetailsPageComponent },

  // CART PAGE
  { path: 'shop/cart', component: CartPageComponent },

  // CHECKOUT FLOW (protected by cart guard)
  {
    path: 'shop/checkout',
    redirectTo: 'shop/checkout/step1',   // ✔ fixes navigation
    pathMatch: 'full',
  },

  {
    path: 'shop/checkout/step1',
    component: Step1SummaryComponent,
    canActivate: [cartNotEmptyGuard],
  },

  {
    path: 'shop/checkout/address',
    component: Step2AddressComponent,
    canActivate: [cartNotEmptyGuard],
  },

  {
    path: 'shop/checkout/confirm',
    component: Step3ConfirmComponent,
    canActivate: [cartNotEmptyGuard],
  },

  // SUCCESS PAGE
  { path: 'shop/order/success', component: OrderSuccessComponent },

  {
    path: 'account/profile',
    component: AccountProfilePageComponent,
    //canActivate: [authGuard],
  },

  {
    path: 'account/orders',
    component: AccountOrdersPageComponent,
    //canActivate: [authGuard],
  },

  {
    path: 'account/orders/:id',
    component: AccountOrderDetailsPageComponent,
    //canActivate: [authGuard],
  },

  // WISHLIST PAGE
{
  path: 'wishlist',
  component: WishlistPageComponent,
  // canActivate: [authGuard], // optional (see below)
},

{
  path: 'admin/dashboard',
  component: AdminDashboardComponent,
}
,

  // FALLBACK
  { path: '**', redirectTo: '/login' },
];
