import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

import { selectUsername } from './state/auth/auth.selectors';
import { logout } from './state/auth/auth.actions';
import { selectCartCount } from './state/cart/cart.selectors';

import { CartIconComponent } from './shop/cart/cart-icon.component';
import { WishlistIconComponent } from './shop/wishlist/wishlist-icon.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    NgIf,
    CartIconComponent,
    WishlistIconComponent,
    MatSnackBarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-shop');

  private store = inject(Store);
  private router = inject(Router);

  username$ = this.store.select(selectUsername);
  cartCount$ = this.store.select(selectCartCount);

  /** 👇 THIS CONTROLS THE HEADER */
  showHeader = false;

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        // ❌ Hide header on login & home
        this.showHeader = url !== '/login' && url !== '/';
      });
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }
}
