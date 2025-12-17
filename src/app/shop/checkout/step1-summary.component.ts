import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  selectCartItems,
  selectCartTotal
} from '../../state/cart/cart.selectors';

import {
  selectCheckoutPromo,
  selectCheckoutPromoError
} from '../../../app/state/checkout/checkout.selectors';

import * as CheckoutActions from '../../state/checkout/checkout.actions';

@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink, FormsModule],
  template: `
    <h1 class="text-2xl font-semibold mb-4">Checkout – Step 1: Summary</h1>

    <div *ngIf="items$ | async as items; else empty">

      <!-- ITEMS -->
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

      <!-- PROMO CODE -->
      <!-- PROMO CODE -->
<div class="mt-6 border-t pt-4">
  <label class="block font-medium mb-2">Code promo</label>

  <div class="flex gap-2">
    <input
      [(ngModel)]="promoCode"
      placeholder="WELCOME10"
      class="border rounded px-3 py-2 w-40"
    />
    <button
      (click)="applyPromo()"
      class="px-4 py-2 bg-gray-800 text-white rounded"
    >
      Appliquer
    </button>
  </div>

  <!-- AVAILABLE PROMOS -->
  <div class="mt-2 text-sm text-gray-500">
    <div class="font-medium text-gray-400">Available codes:</div>
    <ul class="list-disc list-inside">
      <li><strong>WELCOME10</strong> –10% on items</li>
      <li><strong>FREESHIP</strong> – free delivery</li>
      <li><strong>VIP20</strong> –20% for orders ≥ 200€</li>
    </ul>
  </div>

  <!-- ERROR -->
  <p *ngIf="promoError$ | async as error" class="text-red-600 mt-2">
    {{ error }}
  </p>
</div>


      <!-- TOTALS -->
      <div class="mt-6 text-lg">
        <div *ngIf="promo$ | async as promo; else normalTotal">
          <div>Articles: {{ promo.itemsTotal }} €</div>
          <div class="text-green-700">
            Discount: -{{ promo.discount }} €
          </div>
          <div>Shipping: {{ promo.shipping }} €</div>
          <div>Taxes: {{ promo.taxes }} €</div>

          <div class="text-xl font-bold mt-2">
            Total: {{ promo.grandTotal }} €
          </div>

          <div class="text-sm text-green-700 mt-1">
            Applied: {{ promo.appliedPromos.join(', ') }}
          </div>
        </div>

        <ng-template #normalTotal>
          <div class="text-xl font-bold">
            Total: {{ total$ | async }} €
          </div>
        </ng-template>
      </div>

      <!-- CONTINUE -->
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

  promoCode = '';

  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);

  promo$ = this.store.select(selectCheckoutPromo);
  promoError$ = this.store.select(selectCheckoutPromoError);

  applyPromo(): void {
    if (!this.promoCode.trim()) return;

    this.store.dispatch(
      CheckoutActions.applyPromo({ code: this.promoCode.trim() })
    );
  }
}
