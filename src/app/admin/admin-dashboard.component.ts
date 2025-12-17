import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import {
  selectAdminLoading,
  selectAdminError,
  selectAdminTotals,
  selectAdminTopProducts,
  selectAdminRecentOrders,
} from '../state/admin/admin.selectors';

import * as AdminActions from '../state/admin/admin.actions';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <!-- LOADING -->
    <div *ngIf="loading$ | async" class="text-gray-600">
      Loading admin statistics...
    </div>

    <!-- ERROR -->
    <div *ngIf="error$ | async as err" class="text-red-600">
      {{ err }}
    </div>

    <!-- CONTENT -->
    <ng-container *ngIf="totals$ | async as totals">

      <!-- STATS CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="border rounded p-4">
          <div class="text-gray-500">Users</div>
          <div class="text-2xl font-bold">{{ totals.totalUsers }}</div>
        </div>

        <div class="border rounded p-4">
          <div class="text-gray-500">Orders</div>
          <div class="text-2xl font-bold">{{ totals.totalOrders }}</div>
        </div>

        <div class="border rounded p-4">
          <div class="text-gray-500">Revenue</div>
          <div class="text-2xl font-bold">{{ totals.totalRevenue }} €</div>
        </div>
      </div>

      <!-- TOP PRODUCTS -->
      <h2 class="text-xl font-semibold mb-2">Top Products</h2>
      <table class="w-full border mb-8">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">Product</th>
            <th class="p-2 border">Sold</th>
            <th class="p-2 border">Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of topProducts$ | async">
            <td class="p-2 border">{{ p.name }}</td>
            <td class="p-2 border">{{ p.sold }}</td>
            <td class="p-2 border">{{ p.revenue }} €</td>
          </tr>
        </tbody>
      </table>

      <!-- RECENT ORDERS -->
      <h2 class="text-xl font-semibold mb-2">Recent Orders</h2>
      <table class="w-full border">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">Order</th>
            <th class="p-2 border">User</th>
            <th class="p-2 border">Total</th>
            <th class="p-2 border">Date</th>
            <th class="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let o of recentOrders$ | async">
            <td class="p-2 border">{{ o.id }}</td>
            <td class="p-2 border">{{ o.user }}</td>
            <td class="p-2 border">{{ o.total }} €</td>
            <td class="p-2 border">{{ o.createdAt }}</td>
            <td class="p-2 border">{{ o.status }}</td>
          </tr>
        </tbody>
      </table>

    </ng-container>
  `,
})
export class AdminDashboardComponent {
  private store = inject(Store);

  loading$ = this.store.select(selectAdminLoading);
  error$ = this.store.select(selectAdminError);
  totals$ = this.store.select(selectAdminTotals);
  topProducts$ = this.store.select(selectAdminTopProducts);
  recentOrders$ = this.store.select(selectAdminRecentOrders);

  ngOnInit() {
    this.store.dispatch(AdminActions.loadAdminStats());
  }
}
