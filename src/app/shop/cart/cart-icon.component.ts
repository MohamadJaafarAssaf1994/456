import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { selectCartCount } from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <button
      routerLink="/shop/cart"
      class="relative flex items-center px-3 py-1 border rounded hover:bg-gray-100"
    >
      🛒

      <span
        class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full
               w-5 h-5 flex items-center justify-center"
      >
        {{ count$ | async }}
      </span>
    </button>
  `,
})
export class CartIconComponent {
  private store = inject(Store);
  count$ = this.store.select(selectCartCount);
}
