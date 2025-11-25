
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './state/auth/auth.reducer';
import { provideHttpClient } from '@angular/common/http';
import { productsReducer } from './state/products/products.reducer';
import { ratingReducer } from './state/rating/rating.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { ProductsEffects } from './state/products/products.effects';
import { RatingEffects } from './state/rating/rating.effects';
import { cartReducer } from './state/cart/cart.reducer';
import { CartEffects } from './state/cart/cart.effects';
import { checkoutReducer } from './state/checkout/checkout.reducer';



export const appConfig: ApplicationConfig = {
  providers: [
  provideBrowserGlobalErrorListeners(),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideStore({
    auth: authReducer,
    products: productsReducer,
    rating: ratingReducer,
    cart: cartReducer,
    checkout: checkoutReducer

  }),
  provideEffects([
    AuthEffects,
    ProductsEffects,
    RatingEffects,
    CartEffects

  ]),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideHttpClient(),
],
};
