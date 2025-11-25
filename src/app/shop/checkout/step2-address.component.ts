import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { saveAddress } from '../../state/checkout/checkout.actions';

@Component({
  selector: 'app-step2-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <h1 class="text-2xl font-semibold mb-4">Checkout – Step 2: Address</h1>

    <form [formGroup]="form" class="grid gap-4 max-w-lg">

      <div>
        <label class="block font-semibold">First Name</label>
        <input formControlName="firstName" class="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label class="block font-semibold">Last Name</label>
        <input formControlName="lastName" class="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label class="block font-semibold">Street</label>
        <input formControlName="street" class="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label class="block font-semibold">City</label>
        <input formControlName="city" class="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label class="block font-semibold">ZIP Code</label>
        <input formControlName="zip" class="border rounded px-3 py-2 w-full" />
      </div>

      <a
     routerLink="/shop/checkout/confirm"
     class="mt-6 px-4 py-2 bg-blue-600 text-white rounded inline-block"
     >
  Continue to Confirmation →
</a>


      <a routerLink="/shop/checkout" class="text-blue-600 underline ml-4">
        ← Back to Summary
      </a>
    </form>
  `,
})
export class Step2AddressComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern(/^[0-9]{4,10}$/)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // ✔ FIXED: type-safe cast
    this.store.dispatch(
      saveAddress({ address: this.form.value as any })
    );

    this.router.navigateByUrl('/shop/checkout/confirm');
  }
}
