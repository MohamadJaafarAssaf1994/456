import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUsername } from './state/auth/auth.selectors';
import { logout } from './state/auth/auth.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-shop');

  private store = inject(Store);
  private router = inject(Router);
  username$ = this.store.select(selectUsername);

  logout() {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }
}
