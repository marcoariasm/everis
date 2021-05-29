import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { RequestState } from '../../commons/state/request.state';
import { ModalManager } from '../../commons/modal-manager/modal-manager';
import { LoaderState } from 'src/app/commons/state/loader.state';
import { verifyHTTP } from '@aafp/commons/http/verify.http';
import { Router } from '@angular/router';

@Injectable()
export class VerifyPresenter {
  request$ = this.requestState.request;
  subscription = new Subscription();

  constructor(
    private verify: verifyHTTP,
    private requestState: RequestState,
    private modal: ModalManager,
    private router: Router,
    private loaderState: LoaderState
  ) {}

  checkPassword(params: any) {
    const payload = this.handlerPayload(params);
    this.loaderState.open();
    this.verify
      .verify(payload)
      .subscribe(
        data => this.sucessRequest(data),
        error => this.failRequest(error, params)
      );
  }

  private handlerPayload(params: any) {
    const payload = {
      documentType: params.documentType,
      documentNumber: params.documentNumber,
      birthdate: params.birthdate,
      password: params.passwordAFP,
      afp: params.afp,
    };

    return payload;
  }

  private sucessRequest(response: any) {
    this.loaderState.close();
    this.requestState.update(response);
    this.modal.show('confirm', { data: { response } });
  }

  private failRequest(error, params) {
    this.loaderState.close();
    if (params.accessFlag4Uit === '3') {
      this.router.navigate(['/preguntas']);
      return;
    }
  }
}
