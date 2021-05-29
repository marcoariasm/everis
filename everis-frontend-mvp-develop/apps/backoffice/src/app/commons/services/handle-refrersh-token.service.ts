import { Injectable } from '@angular/core';
import { ModalManager } from '../modal-manager/modal-manager';
import { Router } from '@angular/router';
import { RequestState } from '../state/request.state';

@Injectable({
  providedIn: 'root',
})
export class HandleRefreshTokenService {
  private readonly timeAlert = 1140000;

  private readonly timeRedirectToLogin = 1200000;

  constructor(
    private modal: ModalManager,
    private router: Router,
    private state: RequestState
  ) {}

  init() {
    setTimeout(() => {
      this.modal.show('session', {
        data: 'termino la session',
      });
    }, this.timeAlert);

    setTimeout(() => {
      this.modal.closeAll();
      this.state.reset();
      sessionStorage.removeItem('currentUser');
      this.router.navigateByUrl('/login');
    }, this.timeRedirectToLogin);
  }
}
