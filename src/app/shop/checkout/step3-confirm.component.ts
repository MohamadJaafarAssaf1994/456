import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import {
  selectCheckoutAddress,
  selectCheckoutPromo,
} from '../../state/checkout/checkout.selectors';

import * as CartActions from '../../state/cart/cart.actions';
import * as CheckoutActions from '../../state/checkout/checkout.actions';
import * as UserActions from '../../state/user/user.actions';

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

      <div *ngFor="let item of items" class="border p-3 rounded mb-3 flex justify-between">
        <div>
          <div class="font-semibold">{{ item.product.name }}</div>
          <div class="text-gray-600">{{ item.quantity }} × {{ item.product.price }} €</div>
        </div>

        <div class="font-bold">{{ item.quantity * item.product.price }} €</div>
      </div>

      <!-- TOTALS -->
      <div class="mt-4 text-lg" *ngIf="promo$ | async as promo; else normalTotal">
        <div>Articles: {{ promo.itemsTotal }} €</div>
        <div class="text-green-700">Discount: -{{ promo.discount }} €</div>
        <div>Shipping: {{ promo.shipping }} €</div>
        <div>Taxes: {{ promo.taxes }} €</div>

        <div class="text-xl font-bold mt-2">Total: {{ promo.grandTotal }} €</div>

        <div class="text-sm text-green-700 mt-1">Applied: {{ promo.appliedPromos.join(', ') }}</div>
      </div>

      <ng-template #normalTotal>
        <div class="text-xl font-bold mt-4">Total: {{ total$ | async }} €</div>
      </ng-template>
    </div>

    <!-- PLACE ORDER -->
    <button (click)="placeOrder()" class="mt-6 px-4 py-2 bg-green-600 text-white rounded">
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
  promo$ = this.store.select(selectCheckoutPromo);

  placeOrder() {
    let itemsSnapshot: any[] = [];
    let addressSnapshot: any = null;
    let promoSnapshot: any = null;

    this.items$.subscribe((v) => (itemsSnapshot = v)).unsubscribe();
    this.address$.subscribe((v) => (addressSnapshot = v)).unsubscribe();
    this.promo$.subscribe((v) => (promoSnapshot = v)).unsubscribe();

    const subtotal = itemsSnapshot.reduce((sum, i) => sum + i.quantity * i.product.price, 0);

    const tax = promoSnapshot ? promoSnapshot.taxes : Math.round(subtotal * 0.2);
    const shipping = promoSnapshot ? promoSnapshot.shipping : 5;
    const discount = promoSnapshot ? promoSnapshot.discount : 0;
    const total = promoSnapshot ? promoSnapshot.grandTotal : subtotal + tax + shipping;

    const order = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      items: itemsSnapshot.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      subtotal,
      discount,
      tax,
      shipping,
      total,
      appliedPromos: promoSnapshot?.appliedPromos ?? [],
      address: addressSnapshot,
    };

    // ✅ SAVE ORDER IN USER STATE
    this.store.dispatch(UserActions.addUserOrder({ order }));

    // ✅ CLEAR CART + CHECKOUT (promo included)
    this.store.dispatch(CartActions.clearCart());
    this.store.dispatch(CheckoutActions.clearCheckout());

    // ✅ REDIRECT
    this.router.navigateByUrl('/shop/order/success');
  }
}
