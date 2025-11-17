import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRating } from '../../state/rating/rating.actions';
import { selectRatingLoading, selectRatingError, selectRatingResult } 
from '../../state/rating/rating.selectors';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-rating-page',
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  template: `
    <h2 class="text-xl font-semibold mb-4">Product Rating</h2>

    <form [formGroup]="form" (ngSubmit)="apply()">
      <input type="number" formControlName="productId" placeholder="Enter product ID">
      <button class="border px-3 py-2 ml-2">Get Rating</button>
    </form>

    <p *ngIf="loading$ | async">Loading rating...</p>

    <p *ngIf="error$ | async as err" class="text-red-500">
      Error: {{ err }}
    </p>

    <div *ngIf="(result$ | async) as r">
      <p>Average Rating: {{ r.avg_rating }}</p>
      <p>Total Reviews: {{ r.count }}</p>
    </div>
  `
})
export class ProductRatingPageComponent {

  private store = inject(Store);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    productId: 1
  });

  loading$ = this.store.select(selectRatingLoading);
  error$ = this.store.select(selectRatingError);
  result$ = this.store.select(selectRatingResult);

  apply() {
    const id = this.form.value.productId ?? 1;
    this.store.dispatch(loadRating({ productId: id }));
  }
}
