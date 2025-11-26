import { Component, inject } from '@angular/core';
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

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './product-details-page.component.html',
})
export class ProductDetailsPageComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private snack = inject(MatSnackBar);

  product$ = this.store.select(selectProductDetails);
  loading$ = this.store.select(selectProductDetailsLoading);
  error$ = this.store.select(selectProductDetailsError);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadProductDetails({ id }));
  }

  // ⭐ ADD TO CART + SNACKBAR ⭐
  addToCart(product: Product) {
    this.store.dispatch(addItem({ product, quantity: 1 }));

    this.snack.open(
      `✔ Added 1 × ${product.name}`,
      'OK',
      { duration: 2000 }
    );
  }
}
