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
  role: string = '';

  // inject the Auth service private auth authservice
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userStore: UserService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.userStore.getRole().subscribe((value) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = value || roleFromToken;
    });
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
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullName(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          alert(res.message);
          if (this.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/products']);
          }
        },
        error: (err) => {
          alert(err.message);
        },
      });
    } else {
      console.log('Form is invalid');
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your login details are invalid. Please try again.');
    }
  }
}
