import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-3xl px-4 py-10 space-y-4">
      <h2 class="text-2xl font-semibold">App Shop — Placeholder</h2>
      <p class="text-gray-600">Navigation vers les pages demandées :</p>

      <nav class="flex gap-3">
        <button type="button" routerLink="/login" class="rounded border px-3 py-2 hover:bg-gray-50">
          Login
        </button>

        <button type="button" routerLink="/shop/products" class="rounded border px-3 py-2 hover:bg-gray-50">
          Products
        </button>

        <button type="button" routerLink="/shop/rating" class="rounded border px-3 py-2 hover:bg-gray-50">
          Rating
        </button>
      </nav>
    </section>
  `,
})
export class AppPlaceholderComponent {}
