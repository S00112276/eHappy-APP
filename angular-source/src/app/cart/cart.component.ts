import { Component, OnInit, Input } from '@angular/core';
import { Cart, CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  
  constructor() { }

  ngOnInit() {
  }
}