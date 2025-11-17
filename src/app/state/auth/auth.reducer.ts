import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.models';
import * as Auth from './auth.actions';
import { login, logout } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(Auth.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(Auth.loginSuccess, (state, { access, refresh }) => ({
    ...state,
    loading: false,
    access,
    refresh,
  })),

  on(Auth.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(Auth.refreshToken, (state) => ({
    ...state,
    loading: true,
  })),

  on(Auth.refreshSuccess, (state, { access }) => ({
    ...state,
    loading: false,
    access,
  })),

  on(Auth.refreshFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(login, (state, { username }) => ({
    ...state,
    username,
    isLoggedIn: true,
  }))
);
