import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../state/cart/cart.models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="border p-3 mb-4 rounded">

      <div class="flex justify-between">
        <div>
          <h3 class="text-lg font-semibold">{{ item.product.name }}</h3>
          <p class="text-gray-600">{{ item.product.price }} €</p>
        </div>

        <button
          class="text-red-600 underline"
          (click)="remove.emit(item.product.id)"
        >
          Remove
        </button>
      </div>

      <!-- Quantity selector -->
      <div class="mt-2 flex items-center gap-2">
        <label>Qty:</label>
        <input
          type="number"
          min="1"
          class="border rounded px-2 py-1 w-20"
          [value]="item.quantity"
          (change)="quantityChange.emit({ id: item.product.id, qty: $any($event.target).value })"
        />
      </div>
    </div>
  `,
})
export class CartItemComponent {
  @Input() item!: CartItem;

  @Output() remove = new EventEmitter<number>();
  @Output() quantityChange = new EventEmitter<{ id: number; qty: number }>();
}
