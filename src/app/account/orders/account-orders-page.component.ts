import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { selectUserOrders, selectUserLoading } from '../../state/user/user.selectors';
import * as UserActions from '../../state/user/user.actions';

@Component({
  selector: 'app-account-orders-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1 class="text-2xl font-semibold mb-4">My Orders</h1>

    <div *ngIf="loading$ | async">Loading orders...</div>

    <div *ngIf="orders$ | async as orders">
      <div *ngIf="orders.length === 0">You have no orders yet.</div>

      <div
        *ngFor="let order of orders"
        class="border rounded p-4 mb-3 flex justify-between items-center"
      >
        <div>
          <div class="font-semibold">Order #{{ order.id }}</div>
          <div class="text-sm text-gray-600">{{ order.date }} • {{ order.status }}</div>
        </div>

        <div class="flex items-center gap-4">
          <div class="font-bold">{{ order.total }} €</div>

          <a [routerLink]="['/account/orders', order.id]" class="text-blue-600 underline">
            View details →
          </a>
        </div>
      </div>
    </div>
  `,
})
export class AccountOrdersPageComponent implements OnInit {
  private store = inject(Store);

  orders$ = this.store.select(selectUserOrders);
  loading$ = this.store.select(selectUserLoading);

  ngOnInit() {
    this.store
      .select(selectUserOrders)
      .pipe(take(1))
      .subscribe((orders) => {
        if (!orders.length) {
          this.store.dispatch(UserActions.loadUserOrders());
        }
      });
  }
}
