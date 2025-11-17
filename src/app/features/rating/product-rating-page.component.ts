import { Component, inject, signal } from '@angular/core';
import { ShopApiService } from '../../services/shop-api.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-rating-page',
  imports: [
    MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule,
    NgIf
  ],
  template: `
    <mat-card class="max-w-md mx-auto mt-6">
      <h2>Product Rating</h2>

      <mat-form-field class="w-full">
        <mat-label>Product ID</mat-label>
        <input matInput #idInput type="number">
      </mat-form-field>

      <button mat-raised-button color="primary" (click)="fetch(idInput.value)">
        Fetch Rating
      </button>

      <div class="mt-4" *ngIf="rating() as r">
        <p><b>Average Rating:</b> {{ r.avg_rating }}</p>
        <p><b>Count:</b> {{ r.count }}</p>
      </div>

      <div style="color:red;" *ngIf="error()">{{ error() }}</div>
    </mat-card>
  `,
})
export class ProductRatingPageComponent {
  private api = inject(ShopApiService);

  rating = signal<{ avg_rating: number; count: number } | null>(null);
  error = signal<string | null>(null);

  fetch(idValue: string) {
    this.rating.set(null);
    this.error.set(null);

    const id = Number(idValue);

    this.api.getRating(id).subscribe({
      next: (res) => this.rating.set({ avg_rating: res.avg_rating, count: res.count }),
      error: (err) => this.error.set(err?.message || 'Not found')
    });
  }
}
