import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

import { selectWishlistCount } from '../../state/wishlist/wishlist.selectors';

@Component({
  selector: 'app-wishlist-icon',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  template: `
    <button
      routerLink="/wishlist"
      class="relative flex items-center px-3 py-1 border rounded hover:bg-gray-100"
      aria-label="Wishlist"
    >
      ❤️

      <span
        *ngIf="count$ | async as count"
        class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full
               w-5 h-5 flex items-center justify-center"
      >
        {{ count }}
      </span>
    </button>
  `,
})
export class WishlistIconComponent {
  private store = inject(Store);
  count$ = this.store.select(selectWishlistCount);
}
