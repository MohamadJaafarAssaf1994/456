import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import * as CartActions from '../../state/cart/cart.actions';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from './cart-item.component';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink, CartItemComponent],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {

  private store = inject(Store);

  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);

  remove(id: number) {
    this.store.dispatch(CartActions.removeItem({ productId: id }));
  }

  update(id: number, qty: number) {
    this.store.dispatch(CartActions.updateQuantity({ productId: id, quantity: qty }));
  }

  clearAll() {
  this.store.dispatch(CartActions.clearCart());
  }

}
