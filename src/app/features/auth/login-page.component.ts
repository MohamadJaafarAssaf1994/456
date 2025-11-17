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
    <section class="mx-auto max-w-md py-10 px-6">
      <h2 class="text-xl mb-4 font-semibold">Login</h2>

      <app-login-form (submitForm)="onSubmit($event)"></app-login-form>
    </section>
  `
})
export class LoginPageComponent {

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onSubmit(data: { username: string; password: string }) {
    // Dispatch ONLY username
    this.store.dispatch(login({
      username: data.username!,
      password: data.password!
}));


    // Navigate to products
    this.router.navigateByUrl('/shop/products');
  }
}
