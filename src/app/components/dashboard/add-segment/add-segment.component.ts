import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { WebApiService } from 'src/app/service/web-api.service';
import { HttpProviderService } from 'src/app/service/http-provider.service';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { ModalService } from 'src/app/modal/modal.service';
import { AddCategoryComponent } from 'src/app/components/dashboard/add-category/add-category/add-category.component';
@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: ['./add-segment.component.scss'],
})
export class AddSegmentComponent implements OnInit {
  users: any = [];
  segmentList: any = [];
  // users: any = []:
  public fullName: string = '';
  public role: string = '';
  public ModalTitle: string = '';
  ActivateAddCatComp: boolean = false;
  seg: any;
  SegmentName = '';
  SegmentId = '';

  constructor(
    private httpProvider: HttpProviderService,
    private auth: AuthService,
    // private modalService: NgbModal,
    private userStore: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getAllSegments();

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

  async getAllSegments() {
    this.httpProvider.getAllSegments().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.segmentList = resultData;
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

  addSegment() {
    const seg = {
      SegmentName: this.SegmentName,
    };

    this.httpProvider.addSegment(seg).subscribe((res) => {
      console.log(res);
      alert(res.body.segmentName + ' is added!');
      window.location.reload();
    });
  }

  // async addClick() {
  //   console.log(await this.modalService.open(AddCategoryComponent));
  // }
  // closeClick() {
  //   this.ActivateAddCatComp = false;
  // }

  deleteBrand(segment: any) {
    this.httpProvider.deleteSegmentById(segment.id).subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            alert(resultData.message);
            this.getAllSegments();
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
