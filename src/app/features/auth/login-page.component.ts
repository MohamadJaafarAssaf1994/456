import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth/auth.actions';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../ui/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <section
      class="min-h-screen flex items-center justify-center
             px-4 bg-gray-50"
    >
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl mb-4 font-semibold text-center">
          Login
        </h2>

        <app-login-form (submitForm)="onSubmit($event)"></app-login-form>

        <!-- 👇 DEMO CREDENTIALS HINT -->
        <p class="mt-4 text-sm text-gray-500 text-center">
          Demo access<br />
          User → any credentials<br />
          Admin → <strong>Username : admin &nbsp;&nbsp;&nbsp; Password : admin</strong>
        </p>
      </div>
    </section>
  `
})
export class LoginPageComponent {

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onSubmit(data: { username: string; password: string }) {

    /* =========================
       👑 ADMIN SHORTCUT
       ========================= */
    if (data.username === 'admin' && data.password === 'admin') {
      this.router.navigateByUrl('/admin/dashboard');
      return;
    }

    /* =========================
       NORMAL USER FLOW
       ========================= */
    this.store.dispatch(
      login({
        username: data.username,
        password: data.password
      })
    );

    this.router.navigateByUrl('/shop/products');
  }
}
