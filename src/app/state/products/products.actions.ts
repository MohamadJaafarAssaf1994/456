import { createAction, props } from '@ngrx/store';
import { Product, ProductsQuery } from './products.models';

export const loadProducts = createAction(
  '[Products] Load',
  props<{ query: Partial<ProductsQuery> }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Success',
  props<{ count: number; results: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Failure',
  props<{ error: string }>()
);

// ⭐ Load product details
export const loadProductDetails = createAction(
  '[Products] Load Product Details',
  props<{ id: number }>()
);

// ⭐ Success
export const loadProductDetailsSuccess = createAction(
  '[Products] Load Product Details Success',
  props<{ product: Product }>()
);

// ⭐ Failure
export const loadProductDetailsFailure = createAction(
  '[Products] Load Product Details Failure',
  props<{ error: string }>()
);
