import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule],
  template: `
    <div class="rounded border p-4 bg-white shadow-sm">
      <h3 class="font-semibold text-lg">{{ name }}</h3>
      <p>Price: €{{ price }}</p>
      <small>Created: {{ created_at }}</small>
      <div *ngIf="avgRating !== null" class="mt-2">
        ⭐ {{ avgRating }}
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() price!: number;
  @Input() created_at!: string;
  @Input() avgRating: number | null = null;
}
