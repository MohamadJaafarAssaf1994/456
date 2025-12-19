import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import {
  selectAdminLoading,
  selectAdminError,
  selectAdminTotals,
  selectAdminTopProducts,
  selectAdminRecentOrders,
} from '../state/admin/admin.selectors';

import * as AdminActions from '../state/admin/admin.actions';
import * as ProductsActions from '../state/products/products.actions';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="max-w-5xl mx-auto p-6 space-y-8">
      <h1 class="text-3xl font-bold">Admin Dashboard</h1>

      <!-- ADD PRODUCT -->
      <div>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded"
          (click)="showAddForm = !showAddForm"
        >
          ➕ Add Product
        </button>

        <form
          *ngIf="showAddForm"
          class="border p-4 rounded mt-4 space-y-4 max-w-md"
          (ngSubmit)="addProduct()"
        >
          <div>
            <label class="block text-sm font-medium">Product name</label>
            <input [(ngModel)]="name" name="name" required class="border p-2 w-full rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium">Price (€)</label>
            <input
              type="number"
              [(ngModel)]="price"
              name="price"
              required
              class="border p-2 w-full rounded"
            />
          </div>

          <div class="flex gap-3">
            <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Save</button>

            <button type="button" class="px-4 py-2 border rounded" (click)="showAddForm = false">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- LOADING -->
      <div *ngIf="loading$ | async" class="text-gray-600">Loading admin statistics...</div>

      <!-- ERROR -->
      <div *ngIf="error$ | async as err" class="text-red-600">
        {{ err }}
      </div>

      <!-- CONTENT -->
      <ng-container *ngIf="totals$ | async as totals">
        <!-- STATS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <h2 class="text-xl font-semibold">Top Products</h2>
        <table class="w-full border">
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
        <h2 class="text-xl font-semibold">Recent Orders</h2>
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
    </section>
  `,
})
export class AdminDashboardComponent implements OnInit {
  private store = inject(Store);

  // admin stats
  loading$ = this.store.select(selectAdminLoading);
  error$ = this.store.select(selectAdminError);
  totals$ = this.store.select(selectAdminTotals);
  topProducts$ = this.store.select(selectAdminTopProducts);
  recentOrders$ = this.store.select(selectAdminRecentOrders);

  // add product
  showAddForm = false;
  name = '';
  price = 0;

  ngOnInit() {
    this.store.dispatch(AdminActions.loadAdminStats());
  }

  addProduct() {
    this.store.dispatch(
      ProductsActions.addProduct({
        name: this.name,
        price: this.price,
      }),
    );

    this.name = '';
    this.price = 0;
    this.showAddForm = false;
  }
}
