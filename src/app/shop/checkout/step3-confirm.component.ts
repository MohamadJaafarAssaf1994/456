import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import { selectCheckoutAddress } from '../../state/checkout/checkout.selectors';

import * as CartActions from '../../state/cart/cart.actions';
import * as CheckoutActions from '../../state/checkout/checkout.actions';

@Component({
  selector: 'app-step3-confirm',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, RouterLink],
  template: `
    <h1 class="text-2xl font-semibold mb-4">Checkout – Step 3: Confirm Order</h1>

    <!-- ADDRESS -->
    <div *ngIf="address$ | async as address" class="mb-6">
      <h2 class="text-xl font-semibold">Delivery Address</h2>
      <p>{{ address.firstName }} {{ address.lastName }}</p>
      <p>{{ address.street }}</p>
      <p>{{ address.city }} {{ address.zip }}</p>
    </div>

    <!-- ITEMS -->
    <div *ngIf="items$ | async as items">
      <h2 class="text-xl font-semibold mb-2">Your Items</h2>

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

      <div class="text-xl font-bold mt-4">
        Total: {{ total$ | async }} €
      </div>
    </div>

    <!-- PLACE ORDER -->
    <button
      (click)="placeOrder()"
      class="mt-6 px-4 py-2 bg-green-600 text-white rounded"
    >
      Place Order ✔
    </button>

    <a routerLink="/shop/checkout/address" class="text-blue-600 underline ml-4">
      ← Back to Address
    </a>
  `,
})
export class Step3ConfirmComponent {
  private store = inject(Store);
  private router = inject(Router);

  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);
  address$ = this.store.select(selectCheckoutAddress);

  placeOrder() {
    // 1) Clear cart and checkout data
    this.store.dispatch(CartActions.clearCart());
    this.store.dispatch(CheckoutActions.clearCheckout());

    // 2) Redirect to success page
    this.router.navigateByUrl('/shop/order/success');
  }
}
