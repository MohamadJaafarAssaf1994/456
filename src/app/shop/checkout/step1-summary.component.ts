import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  selectCartItems,
  selectCartTotal
} from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <h1 class="text-2xl font-semibold mb-4">Checkout – Step 1: Summary</h1>

    <div *ngIf="items$ | async as items; else empty">
      <!-- Items -->
      <div
        *ngFor="let item of items"
        class="border p-3 rounded mb-3 flex justify-between"
      >
        <div>
          <div class="font-semibold">{{ item.product.name }}</div>
          <div class="text-gray-600">
            {{ item.quantity }} × {{ item.product.price }} €
          </div>
        </div>

        <div class="font-bold">
          {{ item.quantity * item.product.price }} €
        </div>
      </div>

      <!-- Total -->
      <div class="text-xl font-bold mt-4">
        Total: {{ total$ | async }} €
      </div>

      <!-- Continue -->
      <button
        routerLink="/shop/checkout/address"
        class="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Continue to Address →
      </button>
    </div>

    <ng-template #empty>
      <p>Your cart is empty.</p>
    </ng-template>
  `,
})
export class Step1SummaryComponent {
  private store = inject(Store);

  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);
}
