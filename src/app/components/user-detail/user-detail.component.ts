import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/service/auth.service';
import { HttpProviderService } from 'src/app/service/http-provider.service';

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
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
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
    this.httpProvider.getUsers().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          console.log(resultData);
          if (resultData) {
            this.userList = resultData;
            this.id = resultData.forEach(element => {
              
            });;
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
    this.httpProvider.getUsers().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;

          if (resultData) {
            this.userList = resultData;
            this.id = resultData.customerId;
            this.isLoading = true;
            this.httpProvider
              .updateUser(this.signUpForm.value, this.id)
              .subscribe({
                next: (res) => {
                  this.isLoading = false;
                  alert(res.message);
                  this.signUpForm.reset();
                  window.location.reload();
                },
                error: (err) => {
                  alert(err.error.message);
                },
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
}
