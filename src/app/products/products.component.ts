import { Component, OnInit } from '@angular/core';
import { HttpProviderService } from 'src/app/service/http-provider.service';
import { CartService } from 'src/app/service/cart.service.service';
import { AuthService } from '../service/auth.service';
import { WebApiService } from '../service/web-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productList: any = [];
  public filterCategory: any;
  public filterBrand: any;
  searchKey: string = '';
  isLoading: boolean = false;

  constructor(
    private httpProvider: HttpProviderService,
    private cartService: CartService,
    private auth: AuthService,
    private api: WebApiService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    this.isLoading = true;
    this.httpProvider.getAllProducts().subscribe({
      next: (data) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          console.log(resultData);
          if (resultData) {
            this.isLoading = false;
            this.productList = resultData;
            this.filterCategory = resultData;
          }
          this.productList.forEach((a: any) => {
            Object.assign(a, { quantity: 1, total: a.price });
          });
        }
      },
      error: (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.productList = [];
            }
          }
        }
      },
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  // does not function properly as M-M model does not work due to circular reference
  // currently set to filter by exact name
  filter(brand: string) {
    this.filterCategory = this.productList.map((a: any) => {
      if (a.brandProducts[0].brand.brandName === brand || brand === '') {
        return a;
      }
    });
  }
}
