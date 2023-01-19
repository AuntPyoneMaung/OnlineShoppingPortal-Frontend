import { Component, OnInit } from '@angular/core';

// form validation, building
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import auth service
import { AuthService } from 'src/app/service/auth.service';
import ValidateForm from 'src/app/helpers/validateform';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  fieldTextType: boolean = false;
  loginForm!: FormGroup;
  isLoading: boolean = false;

  // inject the Auth service private auth authservice
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userStore: UserService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.isLoading = true;
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const payload = this.auth.decodedToken();
          this.userStore.setFullName(payload.name);
          this.userStore.setRoleForStore(payload.role);
          alert(res.message);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    } else {
      console.log('Form is invalid');
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your login details are invalid. Please try again.');
    }
  }
}
