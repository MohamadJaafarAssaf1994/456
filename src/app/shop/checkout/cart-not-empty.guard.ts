import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartCount } from '../../state/cart/cart.selectors';
import { map } from 'rxjs/operators';

export const cartNotEmptyGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCartCount).pipe(
    map((count) => {
      if (count > 0) {
        return true; // allow navigation
      }

      // cart empty → redirect
      router.navigateByUrl('/shop/products');
      return false;
    }),
  );
};
