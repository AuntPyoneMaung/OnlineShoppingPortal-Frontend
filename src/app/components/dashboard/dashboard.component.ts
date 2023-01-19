import { Component, OnInit, Type } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { WebApiService } from 'src/app/service/web-api.service';
import { HttpProviderService } from 'src/app/service/http-provider.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        CANCEL
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  categoryList: any = [];
  public fullName: string = '';

  constructor(
    private httpProvider: HttpProviderService,
    private auth: AuthService,
    private modalService: NgbModal,
    private userStore: UserService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();

    // observable so can subscribe
    this.userStore.getFullName().subscribe(
      (value) => {
        let fullNameFromToken = this.auth.getNameFromToken();
        this.fullName = value || fullNameFromToken; // in case of refresh page, get from token as observable is emptied
      },
    );
  }

  async getAllCategory() {
    this.httpProvider.getAllCategory().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.categoryList = resultData;
          }
        }
      },
      error: (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.categoryList = [];
            }
          }
        }
      },
    });
  }

  deleteCategoryConfirmation(category: any) {
    this.modalService
      .open(MODALS['deleteModal'], {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.deleteCategory(category);
        },
        (reason) => {}
      );
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
