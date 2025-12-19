import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
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
import { userReducer } from '../app/state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { wishlistReducer } from './state/wishlist/wishlist.reducer';
import { WishlistEffects } from './state/wishlist/wishlist.effects';
import { CheckoutEffects } from './state/checkout/checkout.effects';
import { AdminEffects } from './state/admin/admin.effects';
import { adminReducer } from './state/admin/admin.reducer';

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
      checkout: checkoutReducer,
      user: userReducer,
      wishlist: wishlistReducer,
      admin: adminReducer,
    }),
    provideEffects([
      AuthEffects,
      ProductsEffects,
      RatingEffects,
      CartEffects,
      UserEffects,
      CheckoutEffects,
      AdminEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(),
  ],
};
