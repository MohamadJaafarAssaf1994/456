import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/login-page.component';
import { ProductsPageComponent } from './features/products/products-page.component';
import { ProductRatingPageComponent } from './features/rating/product-rating-page.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { HomeComponent } from './home.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';



export const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'dev', component: DevIndexComponent },

  { path: 'dev/auth', component: DevAuthComponent },

  { path: 'dev/products', component: DevProductsComponent },

  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },

  // Login page
  { path: 'login', component: LoginPageComponent },

  // Products page
  { path: 'shop/products', component: ProductsPageComponent },

  // Rating page
  { path: 'shop/rating', component: ProductRatingPageComponent },

  { path: 'dev', component: DevIndexComponent },

  // Unknown route → redirect to root
  { path: '**', redirectTo: '/login' },

  { path: '', component: HomeComponent, pathMatch: 'full' },

];
