import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as UserActions from './user.actions';
import { OrderDetails, OrderSummary } from '../../account/orders/order.models';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  /* =========================
     LOAD PROFILE
     ========================= */
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserProfile),
      mergeMap(() =>
        this.http.get('/api/me/').pipe(
          map((profile) =>
            UserActions.loadUserProfileSuccess({ profile })
          ),
          catchError((err) =>
            of(
              UserActions.loadUserProfileFailure({
                error: err.message || 'Failed to load profile',
              })
            )
          )
        )
      )
    )
  );

  /* =========================
     UPDATE PROFILE
     ========================= */
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserProfile),
      mergeMap(({ changes }) =>
        this.http.patch('/api/me/', changes).pipe(
          map((profile) =>
            UserActions.updateUserProfileSuccess({ profile })
          ),
          catchError((err) =>
            of(
              UserActions.updateUserProfileFailure({
                error: err.message || 'Failed to update profile',
              })
            )
          )
        )
      )
    )
  );

  /* =========================
     LOAD USER ORDERS
     ========================= */
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserOrders),
      mergeMap(() =>
        this.http.get<OrderSummary[]>('/api/me/orders/').pipe(
          map((orders) =>
            UserActions.loadUserOrdersSuccess({ orders })
          ),
          catchError((err) =>
            of(
              UserActions.loadUserOrdersFailure({
                error: err.message || 'Failed to load orders',
              })
            )
          )
        )
      )
    )
  );

  /* =========================
     LOAD ORDER DETAILS
     ========================= */
  loadOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadOrderDetails),
      mergeMap(({ id }) =>
        this.http.get<OrderDetails>(`/api/orders/${id}/`).pipe(
          map((order) =>
            UserActions.loadOrderDetailsSuccess({ order })
          ),
          catchError((err) =>
            of(
              UserActions.loadOrderDetailsFailure({
                error: err.message || 'Failed to load order',
              })
            )
          )
        )
      )
    )
  );
}
