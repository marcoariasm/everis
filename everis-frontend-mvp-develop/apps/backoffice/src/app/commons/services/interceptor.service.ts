import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@backoffice/env/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === `${environment.url}/backoffice-login/v1/login`) {
      return next.handle(req).pipe(catchError(this.sesionError));
    } else {
      const user = JSON.parse(sessionStorage.getItem('currentUser'));

      const headers = new HttpHeaders({
        'x-prima-signature': user.signature,
      });
      const reqClone = req.clone({ headers });
      return next.handle(reqClone).pipe(catchError(this.sesionError));
    }
  }

  sesionError(error: HttpErrorResponse) {
    error.error.code === 'PR0011' ? this.router.navigateByUrl('/login') : '';
    return throwError(error);
  }
}
