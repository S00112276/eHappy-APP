import { ProductService } from '../shared/product.service';
import { IProduct } from './product'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: IProduct[];
  filteredProducts: IProduct[];
  errorMessage: string;

  constructor(private _productService: ProductService) {
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

  //#region Department
  filterDepartment(department: string) {
    if (department == 'All')
      this.filteredProducts = this.products;
    else {
      department = department.toLocaleLowerCase();
      this.filteredProducts = this.products.filter((product: IProduct) => product.department.toLocaleLowerCase() == department);
    }
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

  //#region Filter
  performFilter(sortBy: string) {
  }
  //#endregion
}
