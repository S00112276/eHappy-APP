import { ProductService } from '../shared/product.service';
import { IProduct } from './product';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem, CartService } from '../shared/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  products: IProduct[];
  filteredProducts: IProduct[];
  errorMessage: string;

  constructor(private _productService: ProductService, private _cartService: CartService) {
  }

  onNotify(message: string): void {
    console.log(message);
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(products => {
      this.products = products,
        this.filteredProducts = this.products;
    },
      error => this.errorMessage = <any>error);
  }

  //#region Cart
  addToCart(product: IProduct) {
    this._cartService.addProduct(product);
  }
  //#endregion

  //#region Search
  _search: string;

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    this.filteredProducts = this.search ? this.performSearch(this.search) : this.products;
  }

  performSearch(searchBy: string): IProduct[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.name.toLocaleLowerCase().indexOf(searchBy) != -1);
  }
  //#endregion

  //#region Sort
  performSort(sortBy: string) {
    if (sortBy == 'Popularity')
      this.filteredProducts = this.filteredProducts.sort(this.sortByPopularity)
    else if (sortBy == 'Price - Low to High')
      this.filteredProducts = this.filteredProducts.sort(this.sortByPriceLow)
    else if (sortBy == 'Price - High to Low')
      this.filteredProducts = this.filteredProducts.sort(this.sortByPriceHigh)
    else if (sortBy == 'Rating')
      this.filteredProducts = this.filteredProducts.sort(this.sortByRating)
  }

  sortByPopularity(p1: IProduct, p2: IProduct) {
    if (p1.stock > p2.stock) return 1
    else if (p1.price < p2.price) return 0
    else return -1
  }

  sortByPriceLow(p1: IProduct, p2: IProduct) {
    if (p1.price > p2.price) return 1
    else if (p1.price < p2.price) return 0
    else return -1
  }

  sortByPriceHigh(p1: IProduct, p2: IProduct) {
    if (p1.price < p2.price) return 1
    else if (p1.price > p2.price) return 0
    else return -1
  }

  sortByRating(p1: IProduct, p2: IProduct) {
    if (p1.reviews > p2.reviews) return 1
    else if (p1.price < p2.price) return 0
    else return -1
  }
  //#endregion  

  //#region Category
    // Mens
  _mens: boolean = false;
  get mens(): boolean {
    return this._mens;
  }

  set mens(value: boolean) {
    this._mens = value;
    this.refine();
  }

  // Womens
  _womens: boolean = false;
  get womens(): boolean {
    return this._womens;
  }

  set womens(value: boolean) {
    this._womens = value;
    this.refine();
  }

  // Kids
  _kids: boolean = false;
  get kids(): boolean {
    return this._kids;
  }

  set kids(value: boolean) {
    this._kids = value;
    this.refine();
  }

  // Jumper
  _jumpers: boolean = false;
  get jumpers(): boolean {
    return this._jumpers;
  }

  set jumpers(value: boolean) {
    this._jumpers = value;
    this.refine();
  }

  // Kids
  _skirts: boolean = false;
  get skirts(): boolean {
    return this._skirts;
  }

  set skirts(value: boolean) {
    this._skirts = value;
    this.refine();
  }

  refine(): void {
    this.filteredProducts = [];
    this.products.forEach(product => {
      if (this._mens == true && product.department == "mens") {
        this.filteredProducts.push(product);
      }
      else if (this._womens == true && product.department == "womens") {
        this.filteredProducts.push(product);
      }
      else if (this._kids == true && product.department == "kids") {
        this.filteredProducts.push(product);
      }
      else if (this._jumpers == true && product.category == "jumper") {
        this.filteredProducts.push(product);
      }
      else if (this._skirts == true && product.category == "skirt") {
        this.filteredProducts.push(product);
      }
      else if (this.filteredProducts == []) {
        this.filteredProducts == this.products;
      }
    });
  }
  //#endregion
}
