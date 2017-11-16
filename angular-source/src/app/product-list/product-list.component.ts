import { ProductService } from '../shared/product.service';
import { IProduct } from './product'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errorMessage: string;
  _listFilter: string;
  
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private _productService: ProductService) {
  }

  onNotify(message: string): void {
    console.log(message);
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(products => {
      this.products = products,
        this.filteredProducts = this.products;
    },
      error => this.errorMessage = <any>error);
  }
  
}
