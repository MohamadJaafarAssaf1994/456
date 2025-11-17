import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProductsList, selectProductsCount, selectProductsLoading } from '../../state/products/products.selectors';
import * as Products from '../../state/products/products.actions';
import { AsyncPipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [
    CommonModule,
    AsyncPipe, NgFor, NgIf,
    ReactiveFormsModule,
    MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule
  ],
  template: `
  <mat-card class="mx-auto max-w-3xl mt-6">
    <h2>Products</h2>

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

    <div *ngIf="loading$ | async">Loading…</div>

    <ul *ngIf="!(loading$ | async)">
      <li *ngFor="let p of (list$ | async)">
        {{ p.id }} – {{ p.name }} – {{ p.price }}€
      </li>
    </ul>
  </mat-card>
  `,
})
export class ProductsPageComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  list$  = this.store.select(selectProductsList);
  count$ = this.store.select(selectProductsCount);
  loading$ = this.store.select(selectProductsLoading);

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

    // Convert null -> undefined to satisfy TypeScript & ProductsQuery typing
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
}
