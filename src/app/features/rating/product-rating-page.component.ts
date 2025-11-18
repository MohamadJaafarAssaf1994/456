import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRating } from '../../state/rating/rating.actions';
import {
  selectRatingLoading,
  selectRatingError,
  selectRatingResult
} from '../../state/rating/rating.selectors';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgIf, AsyncPipe } from '@angular/common';
import { RatingResult } from '../../state/rating/rating.models';
import { Observable } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-rating-page',
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  template: `
    <section class="mx-auto max-w-xl p-6">
      <h2 class="text-2xl font-semibold mb-4">Product Rating</h2>

      <form [formGroup]="form" (ngSubmit)="apply()" class="mb-4 space-x-2">
        <input 
          type="number" 
          formControlName="productId" 
          class="border p-2 rounded"
          placeholder="Enter product ID"
        >
        <button class="border px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          Get Rating
        </button>
      </form>

      <p *ngIf="loading$ | async" class="text-blue-600">
        Loading rating...
      </p>

      <p *ngIf="error$ | async as err" class="text-red-500">
        Error: {{ err }}
      </p>

      <div *ngIf="(result$ | async) as r" class="p-4 border rounded bg-gray-50 mt-4">
        <p><strong>Product ID:</strong> {{ r.productId }}</p>
        <p><strong>Average Rating:</strong> {{ r.avg_rating }}</p>
        <p><strong>Total Reviews:</strong> {{ r.count }}</p>
      </div>
    </section>
  `
})
export class ProductRatingPageComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  // Reactive form with default product ID = 1
  form = this.fb.group({
    productId: 1
  });

  // Selectors
  loading$ = this.store.select(selectRatingLoading);
  error$ = this.store.select(selectRatingError);
  result$ = this.store.select(selectRatingResult) as unknown as Observable<RatingResult | null>;

  apply() {
    const id = this.form.value.productId ?? 1;
    this.store.dispatch(loadRating({ productId: id }));
  }
}
