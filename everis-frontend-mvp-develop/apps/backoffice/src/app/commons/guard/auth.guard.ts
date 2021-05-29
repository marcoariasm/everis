import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@backoffice/commons/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  canActivate(): boolean {
    return this.checkRouting();
  }

  checkRouting(): boolean {
    if (this.authService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
