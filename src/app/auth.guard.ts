import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';
import { RouterModule, Router } from '@angular/router';

// guard is a kind of method that helps to return true or false value
// based on conditions given
// true => allow access

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      alert('Login to continue');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
