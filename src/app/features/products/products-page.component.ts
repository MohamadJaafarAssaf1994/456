import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectProductsList,
  selectProductsCount,
  selectProductsLoading,
  selectProductsError
} from '../../state/products/products.selectors';

import * as Products from '../../state/products/products.actions';

import { AsyncPipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [
    CommonModule,
    AsyncPipe, NgFor, NgIf, RouterLink,
    ReactiveFormsModule,
    MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule
  ],
  template: `
  <mat-card class="mx-auto max-w-3xl mt-6">
    <h2>Products</h2>

    <!-- FILTER FORM -->
    <form [formGroup]="form" (ngSubmit)="apply()">
      <div class="grid gap-3" style="grid-template-columns: repeat(4, 1fr);">

        <mat-form-field>
          <mat-label>Page</mat-label>
          <input matInput type="number" formControlName="page">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Page Size</mat-label>
          <input matInput type="number" formControlName="pageSize">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Min Rating</mat-label>
          <input matInput type="number" formControlName="minRating">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Ordering</mat-label>
          <mat-select formControlName="ordering">
            <mat-option value="-created_at">Newest</mat-option>
            <mat-option value="created_at">Oldest</mat-option>
            <mat-option value="price">Price ↑</mat-option>
            <mat-option value="-price">Price ↓</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <button mat-raised-button color="primary">Apply</button>
    </form>

    <p class="mt-3">Total products: {{ count$ | async }}</p>

    <!-- LOADING -->
    <div *ngIf="loading$ | async" class="text-blue-500">
      Loading products...
    </div>

    <!-- ERROR -->
    <div *ngIf="error$ | async as err" class="text-red-500">
      {{ err }}
    </div>

    <!-- ⭐ CLICKABLE PRODUCT LINKS ⭐ -->
    <ul *ngIf="!(loading$ | async)">
      <li *ngFor="let p of (list$ | async)">
        <a
          [routerLink]="['/shop/product', p.id]"
          class="text-blue-600 underline hover:text-blue-800"
        >
          {{ p.name }} – {{ p.price }}€
        </a>
      </li>
    </ul>

    <!-- ⭐ PAGINATION ⭐ -->
    <ng-container *ngIf="count$ | async as total">
      <ng-container *ngIf="totalPages(total) as maxPages">
        <div class="mt-6 flex items-center justify-center gap-4" *ngIf="total > 0">

          <!-- Previous -->
          <button
            mat-stroked-button
            color="primary"
            (click)="prevPage(total)"
            [disabled]="page <= 1"
          >
            ‹ Previous
          </button>

          <!-- Page info -->
          <span class="text-sm text-gray-700">
            Page {{ page }} / {{ maxPages }}
          </span>

          <!-- Next -->
          <button
            mat-stroked-button
            color="primary"
            (click)="nextPage(total)"
            [disabled]="page >= maxPages"
          >
            Next ›
          </button>

        </div>
      </ng-container>
    </ng-container>

  </mat-card>
  `,
})
export class ProductsPageComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  list$  = this.store.select(selectProductsList);
  count$ = this.store.select(selectProductsCount);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  form = this.fb.group({
    page: 1,
    pageSize: 10,
    minRating: 0,
    ordering: '-created_at'
  });

  ngOnInit() {
    this.apply();
  }

  apply() {
    const raw = this.form.getRawValue();

    const cleanQuery = {
      page: raw.page ?? undefined,
      pageSize: raw.pageSize ?? undefined,
      minRating: raw.minRating ?? undefined,
      ordering: raw.ordering ?? undefined,
    };

    this.store.dispatch(
      Products.loadProducts({ query: cleanQuery })
    );
  }

  // ⭐ SAFE GETTERS
  get pageCtrl() {
    return this.form.get('page');
  }

  get page() {
    return this.pageCtrl?.value ?? 1;
  }

  get pageSize() {
    return this.form.get('pageSize')?.value ?? 10;
  }

  // ⭐ PAGINATION LOGIC
  totalPages(totalCount: number): number {
    return Math.max(1, Math.ceil(totalCount / this.pageSize));
  }

  goToPage(page: number, totalCount: number): void {
    const max = this.totalPages(totalCount);
    const target = Math.min(Math.max(page, 1), max);
    this.form.patchValue({ page: target });
    this.apply();
  }

  nextPage(totalCount: number): void {
    this.goToPage(this.page + 1, totalCount);
  }

  prevPage(totalCount: number): void {
    this.goToPage(this.page - 1, totalCount);
  }
}
