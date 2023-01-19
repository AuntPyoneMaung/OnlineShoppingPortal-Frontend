import { Component, OnInit } from '@angular/core';
// import ValidateForm from 'src/app/helpers/validateform';
import {
  FormBuilder,
  FormControl,
  AbstractControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import ValidateForm from 'src/app/helpers/validateform';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // variable : ofType
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  checkFirstInput(value: string) {
    if (value.length === 1 && value === ' ') {
      this.firstInputIsSpace = true;
    } else {
      this.firstInputIsSpace = false;
    }
  }

  createFormGroup(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      emailId: ['', Validators.required], // email address
      password: ['', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSignupSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.isLoading = true;
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert('Please fill in the complete form.');
    }
  }
}
