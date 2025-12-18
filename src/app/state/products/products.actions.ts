import { createAction, props } from '@ngrx/store';
import { Product, ProductsQuery } from './products.models';

/* =========================
   LOAD PRODUCTS (SHOP)
   ========================= */

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

/* =========================
   PRODUCT DETAILS
   ========================= */

export const loadProductDetails = createAction(
  '[Products] Load Product Details',
  props<{ id: number }>()
);

export const loadProductDetailsSuccess = createAction(
  '[Products] Load Product Details Success',
  props<{ product: Product }>()
);

export const loadProductDetailsFailure = createAction(
  '[Products] Load Product Details Failure',
  props<{ error: string }>()
);

/* =========================
   ADMIN – ADD PRODUCT
   ========================= */

/**
 * Triggered by admin form
 * (name + price only, backend/MSW fills the rest)
 */
export const addProduct = createAction(
  '[Admin Products] Add Product',
  props<{ name: string; price: number }>()
);

/**
 * Called when backend/MSW returns the created product
 */
export const addProductSuccess = createAction(
  '[Admin Products] Add Product Success',
  props<{ product: Product }>()
);

/**
 * Error while adding product
 */
export const addProductFailure = createAction(
  '[Admin Products] Add Product Failure',
  props<{ error: string }>()
);
