import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { selectUserProfile, selectUserLoading } from '../../state/user/user.selectors';
import * as UserActions from '../../state/user/user.actions';

@Component({
  selector: 'app-account-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1 class="text-2xl font-semibold mb-4">My Profile</h1>

    <div *ngIf="loading$ | async">Loading profile...</div>

    <form
      *ngIf="profile$ | async as profile"
      [formGroup]="form"
      (ngSubmit)="save()"
      class="max-w-lg grid gap-4"
    >
      <div>
        <label class="font-semibold">Username</label>
        <div class="border px-3 py-2 rounded bg-gray-100">
          {{ profile.username }}
        </div>
      </div>

      <div>
        <label class="font-semibold">Email</label>
        <div class="border px-3 py-2 rounded bg-gray-100">
          {{ profile.email }}
        </div>
      </div>

      <!-- Newsletter -->
      <label class="flex items-center gap-2">
        <input type="checkbox" formControlName="newsletter" />
        Subscribe to newsletter
      </label>

      <!-- Default min rating -->
      <div>
        <label class="font-semibold">Default minimum rating</label>
        <input
          type="number"
          min="0"
          max="5"
          formControlName="defaultMinRating"
          class="border rounded px-3 py-2 w-full"
        />
      </div>

      <button type="submit" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save preferences
      </button>
    </form>
  `,
})
export class AccountProfilePageComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  profile$ = this.store.select(selectUserProfile);
  loading$ = this.store.select(selectUserLoading);

  form = this.fb.group({
    newsletter: false,
    defaultMinRating: 0,
  });

  ngOnInit() {
    this.store.dispatch(UserActions.loadUserProfile());

    this.profile$.subscribe((profile) => {
      if (profile) {
        this.form.patchValue(profile.preferences);
      }
    });
  }

  save() {
    this.store.dispatch(
      UserActions.updateUserProfile({
        changes: {
          preferences: this.form.value,
        },
      }),
    );
  }
}
