import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';

import { loadProductDetails } from '../../state/products/products.actions';
import {
  selectProductDetails,
  selectProductDetailsLoading,
  selectProductDetailsError,
} from '../../state/products/products.selectors';

import { addItem } from '../../state/cart/cart.actions';
import { Product } from '../../state/products/products.models';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import * as WishlistActions from '../../state/wishlist/wishlist.actions';
import { selectIsInWishlist } from '../../state/wishlist/wishlist.selectors';

import { switchMap, filter } from 'rxjs';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, MatSnackBarModule],
  templateUrl: './product-details-page.component.html',
})
export class ProductDetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private snack = inject(MatSnackBar);

  // =========================
  // SELECTORS
  // =========================

  product$ = this.store.select(selectProductDetails);
  loading$ = this.store.select(selectProductDetailsLoading);
  error$ = this.store.select(selectProductDetailsError);

  // ✅ Reactive wishlist status
  isInWishlist$ = this.product$.pipe(
    filter((p): p is Product => !!p),
    switchMap((p) => this.store.select(selectIsInWishlist(p.id))),
  );

  // =========================
  // LIFECYCLE
  // =========================

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadProductDetails({ id }));
  }

  // =========================
  // ACTIONS
  // =========================

  addToCart(product: Product) {
    this.store.dispatch(addItem({ product, quantity: 1 }));

    this.snack.open(`"${product.name}" added to cart`, 'OK', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  toggleWishlist(productId: number) {
    this.store.dispatch(WishlistActions.toggleWishlist({ productId }));
  }
}
