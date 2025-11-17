import { createReducer, on } from '@ngrx/store';
import { initialProductsState } from './products.models';
import * as P from './products.actions';

export const productsReducer = createReducer(
  initialProductsState,

  on(P.loadProducts, (state, { query }) => ({
    ...state,
    loading: true,
    error: null,
    query: { ...state.query, ...query }
  })),

  on(P.loadProductsSuccess, (state, { count, results }) => ({
    ...state,
    loading: false,
    count,
    results
  })),

  on(P.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
