import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-products-list',
  imports: [NgFor],
  template: `
    <ul>
      <li *ngFor="let p of items">
        {{ p.id }} — {{ p.name }} — €{{ p.price }}
      </li>
    </ul>
  `,
})
export class ProductsListComponent {
  @Input() items: any[] = [];
}
