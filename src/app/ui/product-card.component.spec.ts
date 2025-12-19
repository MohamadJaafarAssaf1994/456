import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as WishlistActions from '../state/wishlist/wishlist.actions';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    // selectIsInWishlist selector → return false by default
    storeSpy.select.and.returnValue(of(false));

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    // REQUIRED INPUTS
    component.productId = 1;
    component.name = 'Laptop';
    component.price = 1000;
    component.created_at = '2024-01-01';
    component.avgRating = 4.5;

    fixture.detectChanges();
  });

  /* =========================
     RENDERING
     ========================= */

  it('should render product name, price and created date', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Laptop');
    expect(compiled.textContent).toContain('€1000');
    expect(compiled.textContent).toContain('2024-01-01');
  });

  it('should render average rating when provided', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('⭐ 4.5');
  });

  /* =========================
     BEHAVIOR
     ========================= */

  it('should dispatch toggleWishlist when heart button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      WishlistActions.toggleWishlist({ productId: 1 }),
    );
  });
});
