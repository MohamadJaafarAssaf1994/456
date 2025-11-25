import { createReducer, on } from '@ngrx/store';
import * as Products from './products.actions';
import { ProductsState, initialProductsState } from './products.models';


export const productsReducer = createReducer(
  initialProductsState,

  on(Products.loadProducts, (state, { query }) => ({
    ...state,
    query: { ...state.query, ...query },
    loading: true,
    error: null
  })),

  on(Products.loadProductsSuccess, (state, { count, results }) => ({
    ...state,
    count,
    results,
    loading: false
  })),

  on(Products.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

    on(Products.loadProductDetails, (state) => ({
      ...state,
      loadingSelected: true,
      errorSelected: null,
      selected: null
    })),

    on(Products.loadProductDetailsSuccess, (state, { product }) => ({
      ...state,
      loadingSelected: false,
      selected: product
    })),

    on(Products.loadProductDetailsFailure, (state, { error }) => ({
      ...state,
      loadingSelected: false,
      errorSelected: error
    })),
);
