import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  products: IProduct[] = [];
  filter: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  addToCart(product: IProduct) {
    this.cartService.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((product) => product.category === this.filter);
  }
}
