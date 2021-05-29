import { Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { RequestState } from '../../commons/state/request.state';
import { ModalManager } from '../../commons/modal-manager/modal-manager';
import { LoaderState } from 'src/app/commons/state/loader.state';
import { ApiSeguimiento } from '@aafp/commons/http/seguimiento.http';

@Injectable()
export class SeguimientoPresenter {

  // request$ = this.requestState.request;
  // subscription = new Subscription();

  constructor(
    private apiSeguimiento: ApiSeguimiento,
    // private requestState: RequestState,
    private modal: ModalManager,
    private loaderState: LoaderState,
    private router: Router,
  ) { }

  consultaSeguimiento(params: any) {
    const { recaptcha } = params;
    this.loaderState.open();
    this.apiSeguimiento.seguimiento(
      this.prepareRequest(params),
      recaptcha
    )
    .subscribe(
      data => {
        if (data) {
          this.sucessRequest(data);
        } else {
          this.loaderState.close();
        }
      }, error => {
        this.loaderState.close();
      }
    );
  }

  prepareRequest(data: any) {
    const payload = data;
    return payload;
  }

  showModalContentInfo() {
    this.modal.show('content', { width: '30vw' });
  }

  private sucessRequest(response: any) {
    this.loaderState.close();
    this.router.navigate(['/resultado-seguimiento']);
  }

}
