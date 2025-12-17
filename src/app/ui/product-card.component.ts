import { Component, Input, inject } from '@angular/core';
import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { selectIsInWishlist } from '../state/wishlist/wishlist.selectors';
import * as WishlistActions from '../state/wishlist/wishlist.actions';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule, AsyncPipe, NgIf],
  template: `
    <div class="relative rounded border p-4 bg-white shadow-sm">

      <!-- ❤️ Wishlist button -->
      <button
        class="absolute top-2 right-2 text-xl"
        (click)="toggleWishlist()"
        aria-label="Toggle wishlist"
      >
        <ng-container *ngIf="isInWishlist$ | async; else notInWishlist">
          ❤️
        </ng-container>
        <ng-template #notInWishlist>🤍</ng-template>
      </button>

      <h3 class="font-semibold text-lg">{{ name }}</h3>
      <p>Price: €{{ price }}</p>
      <small>Created: {{ created_at }}</small>

      <div *ngIf="avgRating !== null" class="mt-2">
        ⭐ {{ avgRating }}
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  private store = inject(Store);

  /** REQUIRED for wishlist */
  @Input() productId!: number;

  /** Existing inputs (unchanged) */
  @Input() name!: string;
  @Input() price!: number;
  @Input() created_at!: string;
  @Input() avgRating: number | null = null;

  isInWishlist$ = this.store.select(
    selectIsInWishlist(this.productId)
  );

  toggleWishlist() {
    this.store.dispatch(
      WishlistActions.toggleWishlist({ productId: this.productId })
    );
  }
}
