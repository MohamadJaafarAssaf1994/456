import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Auth from './auth.actions';
import { ShopApiService } from '../../services/shop-api.service';
import { mergeMap, map, catchError, tap } from 'rxjs';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private api = inject(ShopApiService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Auth.login),
      mergeMap(({ username, password }) =>
        this.api.login(username, password).pipe(
          map(({ access, refresh }) =>
            Auth.loginSuccess({ username, access, refresh })
          ),
          catchError(err =>
            of(Auth.loginFailure({ error: err?.error?.detail ?? 'Invalid login' }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Auth.loginSuccess),
        tap(() => this.router.navigateByUrl('/shop/products'))
      ),
    { dispatch: false }
  );
}
