// Sophia Price - S00160641

import { CartPgComponent } from '../cart-pg/cart-pg.component';
import { IProduct } from '../product-list/product';
import { Component, OnInit, Input } from '@angular/core';
import { Cart, CartService } from '../shared/cart.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  private router: Router
  
  constructor(private _cartService: CartService) {
    this.cart = this._cartService.cart;
   }

  ngOnInit() {
  }

  removeItem(product: IProduct) {
    this._cartService.removeItem(product);
  }
}