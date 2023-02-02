import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { WebApiService } from 'src/app/service/web-api.service';
import { HttpProviderService } from 'src/app/service/http-provider.service';
import { UserService } from 'src/app/service/user.service';
import { ModalService } from 'src/app/modal/modal.service';
import { AddCategoryComponent } from 'src/app/components/dashboard/add-category/add-category/add-category.component';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: any = [];
  categoryList: any = [];
  public fullName: string = '';
  public role: string = '';
  public ModalTitle: string = '';
  ActivateAddCatComp: boolean = false;
  cat: any;
  brands: any = [];

  constructor(
    private httpProvider: HttpProviderService,
    private auth: AuthService,
    private userStore: UserService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategory();

    // observable so can subscribe
    this.userStore.getFullName().subscribe((value) => {
      let fullNameFromToken = this.auth.getNameFromToken();
      this.fullName = value || fullNameFromToken; // in case of refresh page, get from token as observable is emptied
    });

    this.userStore.getRole().subscribe((value) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = value || roleFromToken;

      if (this.role === 'user') {
        this.router.navigate(['/products']);
      }
    });

    // setTimeout(() => {
    //   this.ngOnInit();
    // }, 1000 * 2);
  }

  async getAllCategory() {
    this.httpProvider.getAllCategory().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.categoryList = resultData;
            this.categoryList.forEach((category: { brands: any[] }) => {
              console.log(category);
              category.brands.forEach((brand: { brandName: any }) => {
                console.log(brand);
                this.brands.push(brand);
              });
            });
          }
        }
      },
      error: (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.users = [];
            }
          }
        }
      },
    });
  }

  deleteCategory(category: any) {
    this.httpProvider.deleteCategoryById(category.id).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            alert(resultData.message);
            this.getAllCategory();
          }
        }
      },
      (error: any) => {}
    );
  }

  signout() {
    this.auth.signout();
  }
}
