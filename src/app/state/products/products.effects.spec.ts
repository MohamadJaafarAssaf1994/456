import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProductsEffects } from './products.effects';
import * as ProductsActions from './products.actions';
import { ShopApiService } from '../../services/shop-api.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { take } from 'rxjs/operators';

describe('ProductsEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProductsEffects;
  let api: jasmine.SpyObj<ShopApiService>;
  let store: MockStore;

  const mockQuery = {
    page: 1,
    pageSize: 10,
    minRating: 0,
    ordering: '-created_at',
  };

  beforeEach(() => {
    api = jasmine.createSpyObj('ShopApiService', ['getProducts']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            products: {
              query: mockQuery,
              results: [],
              count: 0,
              loading: false,
              error: null,
              selected: null,
              loadingSelected: false,
              errorSelected: null,
            },
          },
        }),
        { provide: ShopApiService, useValue: api },
      ],
    });

    effects = TestBed.inject(ProductsEffects);
    store = TestBed.inject(MockStore);
  });

  it('should dispatch loadProductsSuccess when API succeeds', (done) => {
    api.getProducts.and.returnValue(
      of({
        count: 1,
        results: [
          {
            id: 1,
            name: 'Laptop',
            price: 1000,
            created_at: '2024-01-01',
          },
        ],
      }),
    );

    actions$ = of(ProductsActions.loadProducts({ query: { page: 1 } }));

    effects.loadProducts$.pipe(take(1)).subscribe((action) => {
      expect(action.type).toBe('[Products] Load Success');

      const success = action as ReturnType<typeof ProductsActions.loadProductsSuccess>;

      expect(success.count).toBe(1);
      expect(success.results.length).toBe(1);

      done();
    });
  });

  it('should dispatch loadProductsFailure when API fails', (done) => {
    api.getProducts.and.returnValue(throwError(() => new Error('API Error')));

    actions$ = of(ProductsActions.loadProducts({ query: { page: 1 } }));

    effects.loadProducts$.pipe(take(1)).subscribe((action) => {
      expect(action.type).toBe('[Products] Load Failure');

      const failure = action as ReturnType<typeof ProductsActions.loadProductsFailure>;

      expect(failure.error).toBe('API Error');

      done();
    });
  });
});
