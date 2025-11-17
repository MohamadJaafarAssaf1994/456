import { createReducer, on } from '@ngrx/store';
import * as Auth from './auth.actions';

export interface AuthState {
  username: string | null;
  access: string | null;
  refresh: string | null;
  isLoggedIn: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  username: null,
  access: null,
  refresh: null,
  isLoggedIn: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  on(Auth.login, state => ({
    ...state,
    error: null,
  })),

  on(Auth.loginSuccess, (state, { username, access, refresh }) => ({
    ...state,
    username,
    access,
    refresh,
    isLoggedIn: true,
    error: null,
  })),

  on(Auth.loginFailure, (state, { error }) => ({
    ...state,
    error,
    isLoggedIn: false,
  })),

  on(Auth.logout, () => ({
    ...initialAuthState
  }))

);
