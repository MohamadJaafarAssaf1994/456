import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.models';

export const selectProducts = createFeatureSelector<ProductsState>('products');

export const selectProductsQuery = createSelector(
  selectProducts,
  s => s.query
);

export const selectProductsList = createSelector(
  selectProducts,
  s => s.results
);

export const selectProductsCount = createSelector(
  selectProducts,
  s => s.count
);

export const selectProductsLoading = createSelector(
  selectProducts,
  s => s.loading
);

export const selectProductsError = createSelector(
  selectProducts,
  s => s.error
);
