import { Component, OnInit } from '@angular/core';
import { Cart, CartService } from '../shared/cart.service';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { IProduct } from '../product-list/product';

@Component({
  selector: 'app-cart-pg',
  templateUrl: './cart-pg.component.html',
  styleUrls: ['./cart-pg.component.css']
})
export class CartPgComponent implements OnInit {
  cart: Cart = new Cart();
  private router: Router

  constructor(private _cartService: CartService) {
    this.cart = this._cartService.cart;
   }

  ngOnInit() {
  }

  removeProduct(product: IProduct) {
    this._cartService.removeProduct(product);
  }

  addProduct(product: IProduct) {
    this._cartService.addProduct(product);
  }

}
