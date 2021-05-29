import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IRequestLogin, IResponseLogin } from '@everis-afp-prima/data';
import { AuthService } from '@backoffice/commons/services/auth.service';
import { LoaderState } from '@backoffice/commons/state/loader.state';
import { ModalManager } from '@backoffice/commons/modal-manager/modal-manager';
import { HandleRefreshTokenService } from '@backoffice/commons/services/handle-refrersh-token.service';
import { sha256 } from 'js-sha256';
@Injectable()
export class LoginPresenter {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderState: LoaderState,
    private modal: ModalManager,
    private handleRefreshTokenService: HandleRefreshTokenService
  ) {}

  private loginSuccess(response: IResponseLogin, values) {
    this.handleRefreshTokenService.init();
    this.loaderState.close();
    this.authService.setUser(response, values);
    this.router.navigate(['/tramites']);
  }

  private failRequest(error: any) {
    const {
      error: { code },
    } = error;
    this.loaderState.close();

    if (code === 'PRI0007') {
      this.modal.show('usernotfound');
    } else {
      this.modal.show('reject');
    }
  }

  public login(values: IRequestLogin) {
    const valuesEncrypt = {
      login: values.login,
      password: sha256(values.password),
    };
    this.loaderState.open();
    this.authService.loginUser(valuesEncrypt).subscribe(
      (data) => this.loginSuccess(data, values),
      (error) => {
        this.failRequest(error);
      }
    );
  }
}
