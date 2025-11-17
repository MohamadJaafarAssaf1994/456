export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  _avg?: number;
}

export interface ProductsQuery {
  page: number;
  pageSize: number;
  minRating: number;
  ordering: string;
}

export interface ProductsState {
  query: ProductsQuery;
  count: number;
  results: Product[];
  loading: boolean;
  error: string | null;
}

export const initialProductsState: ProductsState = {
  query: {
    page: 1,
    pageSize: 10,
    minRating: 0,
    ordering: '-created_at'
  },
  count: 0,
  results: [],
  loading: false,
  error: null
};
