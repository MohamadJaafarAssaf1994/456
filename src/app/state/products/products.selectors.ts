import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.models';

// 1. Base selector for the feature state
export const selectProductsState = createFeatureSelector<ProductsState>('products');

// 2. Select list
export const selectProductsList = createSelector(selectProductsState, (state) => state.results);

// 3. Select total count
export const selectProductsCount = createSelector(selectProductsState, (state) => state.count);

// 4. Select loading
export const selectProductsLoading = createSelector(selectProductsState, (state) => state.loading);

// 5. Select error (THIS WAS MISSING)
export const selectProductsError = createSelector(selectProductsState, (state) => state.error);

// 6. Select current filters / query
export const selectProductsQuery = createSelector(selectProductsState, (state) => state.query);

//  Selected product details
export const selectProductDetails = createSelector(selectProductsState, (state) => state.selected);

//  Loading flag for product details
export const selectProductDetailsLoading = createSelector(
  selectProductsState,
  (state) => state.loadingSelected,
);

//  Error flag for product details
export const selectProductDetailsError = createSelector(
  selectProductsState,
  (state) => state.errorSelected,
);
