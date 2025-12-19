import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductCardComponent } from '../../ui/product-card.component';

import { selectWishlistProductIds } from '../../state/wishlist/wishlist.selectors';

import { selectProductsList } from '../../state/products/products.selectors';

import * as WishlistActions from '../../state/wishlist/wishlist.actions';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ProductCardComponent],
  templateUrl: './wishlist-page.component.html',
})
export class WishlistPageComponent {
  private store = inject(Store);

  wishlistIds$ = this.store.select(selectWishlistProductIds);
  products$ = this.store.select(selectProductsList);

  remove(productId: number) {
    this.store.dispatch(WishlistActions.toggleWishlist({ productId }));
  }

  clearAll() {
    this.store.dispatch(WishlistActions.clearWishlist());
  }
}
