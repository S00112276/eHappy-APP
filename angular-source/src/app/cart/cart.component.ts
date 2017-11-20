import { IProduct } from '../product-list/product';
import { Component, OnInit, Input } from '@angular/core';
import { Cart, CartItem, CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  productsInCart: CartItem[];
  
  constructor() { }

  ngOnInit() {
  }
}