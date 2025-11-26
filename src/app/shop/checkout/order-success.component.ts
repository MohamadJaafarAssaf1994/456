import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-xl mx-auto mt-10 text-center space-y-4">
      <h1 class="text-3xl font-bold text-green-600">
        ✅ Order Confirmed!
      </h1>

      <p class="text-gray-700">
        Thank you for your purchase. Your order has been successfully placed.
      </p>

      <p class="text-gray-500 text-sm">
        You can now continue shopping or close this page.
      </p>

      <a
        routerLink="/shop/products"
        class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Back to products
      </a>
    </div>
  `,
})
export class OrderSuccessComponent {}
