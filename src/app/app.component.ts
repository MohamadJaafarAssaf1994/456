import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <!-- HEADER (hidden on login & home pages) -->
    <header
      *ngIf="showHeader"
      class="p-4 border-b flex justify-between items-center"
    >
      <strong>My Shop</strong>

      <button
        (click)="logout()"
        class="px-3 py-1 border rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </header>

    <main class="p-4">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  showHeader = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        // ❌ Hide header on login & home
        this.showHeader = url !== '/login' && url !== '/';
      });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
