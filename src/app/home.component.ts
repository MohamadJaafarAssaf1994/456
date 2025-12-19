import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section
      class="min-h-screen flex flex-col items-center justify-center
             px-4 space-y-6 bg-gray-50"
    >
      <h1 class="text-3xl font-bold tracking-tight text-blue-600">Bienvenue sur My Shop</h1>

      <p class="text-gray-600">Choisis une zone :</p>

      <div class="flex gap-4">
        <button
          type="button"
          routerLink="/dev"
          class="inline-flex items-center rounded-lg
                 bg-amber-600 px-5 py-3 font-medium text-white
                 hover:bg-amber-700 focus:outline-none focus:ring"
        >
          Zone de test MSW
        </button>

        <button
          type="button"
          routerLink="/login"
          class="inline-flex items-center rounded-lg
                 bg-emerald-600 px-5 py-3 font-medium text-white
                 hover:bg-emerald-700 focus:outline-none focus:ring"
        >
          Accéder à l’app
        </button>
      </div>
    </section>
  `,
})
export class HomeComponent {
  protected readonly title = signal('my-shop');
}
