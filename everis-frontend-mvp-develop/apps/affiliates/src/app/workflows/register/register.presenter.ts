import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestState } from '@affiliates/commons/state/request.state';
import { LoaderState } from '@affiliates/commons/state/loader.state';
import { HttpRegister } from '@affiliates/commons/http/register.http';
import { ModalManager } from '@affiliates/commons/modal-manager/modal-manager';
import { IFlow } from '@everis-afp-prima/data';

@Injectable()
export class RegisterPresenter {
  state$ = this.requestState;
  subscription = new Subscription();
  dataRequest:IFlow;
  constructor(
    private requestState: RequestState,
    private modal: ModalManager,
    private loaderState: LoaderState,
    private router: Router,
    private httpRegister: HttpRegister
  ) { }

  register(data, signature) {
    this.dataRequest = data;

    this.loaderState.open();
    this.httpRegister.register(data, signature)
      .subscribe(
        res => this.sucessRequest(res,this.dataRequest),
        error => this.failRequest(error)
      );
  }

  private sucessRequest(response,dataRequest) {
    this.loaderState.close();
    this.modal.show('register', { width: '584px', data: {dataRequest,...response } });
    // this.state$.reset();
  }

  private failRequest(error) {
    this.loaderState.close();
    this.modal.show('reject', { data: { ...error } });

  }

  backStep() {
    this.router.navigate(['/validacion']);
  }
}
