import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/service/auth.service';
import { HttpProviderService } from 'src/app/service/http-provider.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  // variable : ofType
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  userList: any = [];
  users: any = [];
  id!: number;
  firstInputIsSpace = false;
  isLoading: boolean = false;
  // make a non-nullable form!, controls input fields, validation rules, etc
  signUpForm!: FormGroup;
  /*
    fb:FormBuilder is a param passed to constructor -- to setup initial object state
    of private class property 'fb' and assigns the value of passed argument into it
    FormBuilder provides a way to create instances of 'FormControl', 'FormGroup', "FormArray", reactively
        - used to create and manage forms
  */
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private httpProvider: HttpProviderService,
    private userStore: UserService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();

    this.userStore.getUserId().subscribe((value) => {
      let idFromToken = this.auth.getIdFromToken();
      console.log('this is id: ', this.auth.getIdFromToken());
      this.id = idFromToken;
    });

    this.getAllUser();
  }

  checkFirstInput(value: string) {
    if (value.length === 1 && value === ' ') {
      this.firstInputIsSpace = true;
    } else {
      this.firstInputIsSpace = false;
    }
  }
  async getAllUser() {
    this.httpProvider.getUserById(this.id).subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          console.log(resultData);
          if (resultData) {
            this.userList = resultData;
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

  createFormGroup(): void {
    this.signUpForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      zip: [''],
      phone: [''],
    });
  }

  onSignupSubmit() {
    console.log(this.signUpForm.value);
    this.isLoading = true;
    this.id = this.auth.getIdFromToken();
    console.log(this.id);
    this.httpProvider.updateUser(this.signUpForm.value, this.id).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert(res.message);
        this.signUpForm.reset();
        window.location.reload();
      },
      error: (err) => {
        alert('Unknown error occured'); // backend new{Message=""} unable to read with err.error.message
        // window.location.reload();
      },
    });
  }

  // addtheCategory() {
  //   const cat = {
  //     CategoryName: this.CategoryName,
  //     SegmentId: this.SegmentId,
  //   };

  //   this.service.addCategory(cat).subscribe((res) => {
  //     console.log(res);
  //     alert(res.body.categoryName + ' is added!');
  //     window.location.reload();
  //   });
  // }
}
