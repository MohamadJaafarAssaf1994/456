import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login } from './auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap(({ username }) => {
          console.log('Fake login effect triggered:', username);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
