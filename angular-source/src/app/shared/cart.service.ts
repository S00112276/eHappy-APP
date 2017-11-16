import { Injectable } from '@angular/core';
import { IProduct } from '../product-list/product';

export interface CartItem {
    product: IProduct;
    count: number;
    totalCost: number;
}

export class Cart {
    count: number = 0;
    totalCost: number = 0;
    items: CartItem[] = [];
}

@Injectable()
export class CartService {
    cart: Cart = new Cart();
    // This methid adds the new product
    // or increases the number of same products in the cart.
    // Also updates the totalCost and count of items in the cart.

    addProduct(product: IProduct): CartItem {
        // Find CartItem in items
        let item: CartItem = this.findItem(product._id);
        
        //Check if it was found
        if(item) {
            // Item was found
            // Increase count of that item
            item.count ++;  
            // Increase total cost of those items
            item.totalCost += product.price;
        } else {
            // Item was not found
            // Create the cart item
            item = {
                product: product,
                count: 1,
                totalCost: product.price
            };
            // Add item to items
            this.cart.count ++;
            // Increase amount in the cart
            this.cart.totalCost += product.price;
            return item;
        }
    }
        // This method returns cart item by product _id
        findItem(id:string): CartItem {
            for (let i = 0; i < this.cart.items.length; i++) {
                if(this.cart.items[i].product._id === id) {
                    return this.cart.items[i];
                }
            }
            return null;
        }
}