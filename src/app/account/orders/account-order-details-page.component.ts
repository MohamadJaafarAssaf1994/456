import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { selectSelectedOrder, selectUserLoading } from '../../state/user/user.selectors';
import * as UserActions from '../../state/user/user.actions';

@Component({
  selector: 'app-account-order-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a routerLink="/account/orders" class="underline text-blue-600"> ← Back to orders </a>

    <h1 class="text-2xl font-semibold my-4">Order #{{ orderId }}</h1>

    <div *ngIf="loading$ | async">Loading order...</div>

    <div *ngIf="order$ | async as order">
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p><strong>Date:</strong> {{ order.date }}</p>

      <!-- ADDRESS -->
      <div class="my-4">
        <h2 class="text-xl font-semibold">Delivery Address</h2>
        <p>{{ order.address.firstName }} {{ order.address.lastName }}</p>
        <p>{{ order.address.street }}</p>
        <p>{{ order.address.city }} {{ order.address.zip }}</p>
      </div>

      <!-- ITEMS -->
      <h2 class="text-xl font-semibold mt-6">Items</h2>

      <div *ngFor="let item of order.items" class="border rounded p-3 mb-2 flex justify-between">
        <div>
          <div class="font-semibold">{{ item.name }}</div>
          <div class="text-gray-600">{{ item.quantity }} × {{ item.price }} €</div>
        </div>

        <div class="font-bold">{{ item.quantity * item.price }} €</div>
      </div>

      <!-- TOTALS -->
      <div class="mt-4 border-t pt-4">
        <p>Subtotal: {{ order.subtotal }} €</p>
        <p>Tax: {{ order.tax }} €</p>
        <p>Shipping: {{ order.shipping }} €</p>
        <p class="font-bold text-lg">Total: {{ order.total }} €</p>
      </div>
    </div>
  `,
})
export class AccountOrderDetailsPageComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  orderId = this.route.snapshot.paramMap.get('id')!;
  order$ = this.store.select(selectSelectedOrder);
  loading$ = this.store.select(selectUserLoading);

  ngOnInit() {
    this.store
      .select(selectSelectedOrder)
      .pipe(take(1))
      .subscribe((order) => {
        // ✅ Load from API ONLY if not already present
        if (!order || order.id !== this.orderId) {
          this.store.dispatch(UserActions.loadOrderDetails({ id: this.orderId }));
        }
      });
  }
}
