import { Routes } from '@angular/router';
import { AppPlaceholderComponent } from './app-placeholder.component';
import { LoginPageComponent } from './features/auth/login-page.component';
import { ProductsPageComponent } from './features/products/products-page.component';
import { ProductRatingPageComponent } from './features/rating/product-rating-page.component';

export const routes: Routes = [
  // Redirect root → login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Placeholder
  { path: 'app', component: AppPlaceholderComponent },

  // Login page
  { path: 'login', component: LoginPageComponent },

  // Products page
  { path: 'shop/products', component: ProductsPageComponent },

  // Rating page
  { path: 'shop/rating', component: ProductRatingPageComponent },

  // Unknown route → redirect to root
  { path: '**', redirectTo: '/login' },
];
