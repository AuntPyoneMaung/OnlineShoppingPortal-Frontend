import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { WebApiService } from 'src/app/service/web-api.service';
import { HttpProviderService } from 'src/app/service/http-provider.service';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { ModalService } from 'src/app/modal/modal.service';
import { AddCategoryComponent } from 'src/app/components/dashboard/add-category/add-category/add-category.component';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent {
  users: any = [];
  brandList: any = [];
  // users: any = []:
  public fullName: string = '';
  public role: string = '';
  public ModalTitle: string = '';
  ActivateAddCatComp: boolean = false;
  cat: any;
  BrandName = '';
  CategoryId = '';

  constructor(
    private httpProvider: HttpProviderService,
    private auth: AuthService,
    // private modalService: NgbModal,
    private userStore: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getAllBrand();

    // observable so can subscribe
    this.userStore.getFullName().subscribe((value) => {
      let fullNameFromToken = this.auth.getNameFromToken();
      this.fullName = value || fullNameFromToken; // in case of refresh page, get from token as observable is emptied
    });

    this.userStore.getRole().subscribe((value) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = value || roleFromToken;
    });
    // setTimeout(() => {
    //   this.ngOnInit();
    // }, 1000 * 10);
  }

  async getAllBrand() {
    this.httpProvider.getAllBrand().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.brandList = resultData;
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
  addtheCategory() {
    const cat = {
      BrandName: this.BrandName,
      CategoryId: this.CategoryId,
    };

    this.httpProvider.addBrand(cat).subscribe((res) => {
      console.log(res);
      alert(res.message);
      window.location.reload();
    });
  }

  async addClick() {
    console.log(await this.modalService.open(AddCategoryComponent));
  }
  closeClick() {
    this.ActivateAddCatComp = false;
  }

  deleteBrand(category: any) {
    this.httpProvider.deleteBrandById(category.id).subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            alert(resultData.message);
            this.getAllBrand();
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

  signout() {
    this.auth.signout();
  }
}
