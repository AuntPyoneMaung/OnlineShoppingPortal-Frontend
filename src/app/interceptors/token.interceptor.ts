import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // append the token to the header
    const myToken = this.auth.getToken();
    // modify the request with token in header
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });
    }
    // send back
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            alert('Session timeout. Login again for access!');
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => new Error('Unknown error occured'));
      })
    );
    // utilise in app.module provider[]
  }
}
