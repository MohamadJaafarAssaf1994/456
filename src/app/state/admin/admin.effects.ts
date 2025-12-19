import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as AdminActions from './admin.actions';
import { AdminStats } from './admin.models';

/* =========================
   ADMIN EFFECTS
   ========================= */

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  /* =========================
     LOAD ADMIN STATS
     ========================= */

  loadStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdminStats),
      mergeMap(() =>
        this.http.get<AdminStats>('/api/admin/stats/').pipe(
          map((stats) => AdminActions.loadAdminStatsSuccess({ stats })),
          catchError((err) =>
            of(
              AdminActions.loadAdminStatsFailure({
                error: err?.message || 'Failed to load admin statistics',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
