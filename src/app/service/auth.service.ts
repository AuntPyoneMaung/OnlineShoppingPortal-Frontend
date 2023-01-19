import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7201/api/User/';

  private userPayload: any;

  // inject httpclient inside constructor of service to enable API calling
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  // passing body into param
  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj); // requires object ot be passed
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  signout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // these are then needed to be injected into respective components

  // set and get token
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  //check if user is logged in
  isLoggedIn(): boolean {
    // returns a string but with !!, it means if there is a token, it returns True (not not)
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwt = new JwtHelperService();
    const token = this.getToken()!;
    // method is non-null, method will return sth (cuz return type not specified)
    console.log(jwt.decodeToken(token));
    return jwt.decodeToken(token); // contains name and role as defined in api
  }

  getNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
