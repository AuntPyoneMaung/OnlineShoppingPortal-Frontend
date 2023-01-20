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
  productList: any = [];
  public filterBrand: any;
  searchKey: string = '';
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
    this.api.getAllProducts().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.productList = resultData;
          }
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
  filter(brand: string) {
    this.filterBrand = this.productList.filter((a: any) => {
      if (a.brand == brand || brand == '') {
        return a;
      }
    });
  }
}
