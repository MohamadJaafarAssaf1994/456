import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AuthEffects } from './auth.effects';
import * as AuthActions from './auth.actions';
import { ShopApiService } from '../../services/shop-api.service';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
  let api: jasmine.SpyObj<ShopApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ShopApiService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: ShopApiService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    api = TestBed.inject(ShopApiService) as jasmine.SpyObj<ShopApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  /* =========================
     LOGIN SUCCESS
     ========================= */

  it('should dispatch loginSuccess when login succeeds', (done) => {
    api.login.and.returnValue(
      of({
        access: 'mock-access',
        refresh: 'mock-refresh',
      }),
    );

    actions$ = of(
      AuthActions.login({
        username: 'john_doe',
        password: '1234',
      }),
    );

    effects.login$.pipe(take(1)).subscribe((action) => {
      expect(action.type).toBe('[Auth] Login Success');

      const success = action as ReturnType<typeof AuthActions.loginSuccess>;

      expect(success.username).toBe('john_doe');
      expect(success.access).toBe('mock-access');
      expect(success.refresh).toBe('mock-refresh');

      done();
    });
  });

  /* =========================
     LOGIN FAILURE
     ========================= */

  it('should dispatch loginFailure when login fails', (done) => {
    api.login.and.returnValue(
      throwError(() => ({
        error: { detail: 'Invalid credentials' },
      })),
    );

    actions$ = of(
      AuthActions.login({
        username: 'john_doe',
        password: 'wrong',
      }),
    );

    effects.login$.pipe(take(1)).subscribe((action) => {
      expect(action.type).toBe('[Auth] Login Failure');

      const failure = action as ReturnType<typeof AuthActions.loginFailure>;

      expect(failure.error).toBe('Invalid credentials');

      done();
    });
  });

  /* =========================
     NAVIGATION SIDE EFFECT
     ========================= */

  it('should navigate to /shop/products on loginSuccess', (done) => {
    actions$ = of(
      AuthActions.loginSuccess({
        username: 'john_doe',
        access: 'token',
        refresh: 'refresh',
      }),
    );

    effects.loginSuccess$.pipe(take(1)).subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/shop/products');
      done();
    });
  });
});
