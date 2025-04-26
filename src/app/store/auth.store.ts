import { AuthResponse } from '../core/models/auth.models';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { tapResponse } from '@ngrx/operators';

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: AuthResponse | null;
}

export const authInitialState: AuthState = {
  loading: false,
  error: null,
  user: null,
}

export const authStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods((store, authService = inject(AuthService)) => ({
    loginIn: rxMethod<{ userName: string, password: string }>(pipe(
      tap(() => patchState(store, { loading: true })),
      switchMap(({ userName, password }) => authService.loginIn(userName, password).pipe(
        tapResponse({
          next: (response: AuthResponse) => patchState(store, { loading: false, user: response }),
          error: () => patchState(store, { loading: false }),
        })
      )),
    ))
  }))
)
