import { createReducer, on } from '@ngrx/store';
import * as Auth from './auth.actions';

export interface AuthState {
  username: string | null;
  isLoggedIn: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  username: null,
  isLoggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(Auth.login, (state) => ({
    ...state,
    error: null,
  })),

  on(Auth.loginSuccess, (state, { username }) => ({
    ...state,
    username,
    isLoggedIn: true,
    error: null,
  })),

  on(Auth.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    error,
  })),

  on(Auth.logout, () => initialAuthState),
);
