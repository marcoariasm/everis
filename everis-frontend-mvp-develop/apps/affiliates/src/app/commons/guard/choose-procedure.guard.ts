import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestState } from '../../commons/state/request.state';

@Injectable({
  providedIn: 'root'
})
export class ChooseProcedureGuard implements CanActivate {

  constructor(
    private requestState: RequestState,
    private router: Router,
  ) {

  }

  canActivate(): boolean {
    return this.checkRouting();
  }

  checkRouting(): boolean {
    if (this.requestState.hasChooseProcedure) {
      return true;
    } else {
      this.router.navigate(['/tipo-de-tramite']);
      return false;
    }
  }

}
