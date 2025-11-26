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
        <input
          formControlName="firstName"
          class="border rounded px-3 py-2 w-full"
        />
        <p *ngIf="form.controls.firstName.touched && form.controls.firstName.invalid"
           class="text-red-600 text-sm">
          First name is required.
        </p>
      </div>

      <div>
        <label class="block font-semibold">Last Name</label>
        <input
          formControlName="lastName"
          class="border rounded px-3 py-2 w-full"
        />
        <p *ngIf="form.controls.lastName.touched && form.controls.lastName.invalid"
           class="text-red-600 text-sm">
          Last name is required.
        </p>
      </div>

      <div>
        <label class="block font-semibold">Street</label>
        <input
          formControlName="street"
          class="border rounded px-3 py-2 w-full"
        />
        <p *ngIf="form.controls.street.touched && form.controls.street.invalid"
           class="text-red-600 text-sm">
          Street is required.
        </p>
      </div>

      <div>
        <label class="block font-semibold">City</label>
        <input
          formControlName="city"
          class="border rounded px-3 py-2 w-full"
        />
        <p *ngIf="form.controls.city.touched && form.controls.city.invalid"
           class="text-red-600 text-sm">
          City is required.
        </p>
      </div>

      <div>
        <label class="block font-semibold">ZIP Code</label>
        <input
          formControlName="zip"
          class="border rounded px-3 py-2 w-full"
        />
        <p *ngIf="form.controls.zip.touched && form.controls.zip.invalid"
           class="text-red-600 text-sm">
          ZIP must be 4–10 digits.
        </p>
      </div>

      <button
        (click)="submit()"
        [disabled]="form.invalid"
        class="mt-6 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        Continue to Confirmation →
      </button>

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

    this.store.dispatch(
      saveAddress({ address: this.form.value as any })
    );

    this.router.navigateByUrl('/shop/checkout/confirm');
  }
}
