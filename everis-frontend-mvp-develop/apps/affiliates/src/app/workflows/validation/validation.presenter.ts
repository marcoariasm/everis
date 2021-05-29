import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAffiliates, IValidation, EState } from '@everis-afp-prima/data';
import { HttpValidation } from '@affiliates/commons/http/validation.http';
import { HttpProcedure } from '@affiliates/commons/http/procedure.http';
import { RequestState } from '@affiliates/commons/state/request.state';
import { LoaderState } from '@affiliates/commons/state/loader.state';
import { ModalManager } from '@affiliates/commons/modal-manager/modal-manager';

@Injectable()
export class ValidationPresenter {
  state$ = this.requestState;
  subscription = new Subscription();

  constructor(
    private requestState: RequestState,
    private httpValidation: HttpValidation,
    private httpProcedure: HttpProcedure,
    private loaderState: LoaderState,
    private modal: ModalManager,
    private router: Router
  ) {}

  verify(values: IAffiliates) {
    const {
      birthdate,
      documentNumber,
      documentType,
      isAffiliate,
      recaptcha,
      code,
    } = values;
    const payload = this.handlerPayload({
      birthdate,
      documentNumber,
      documentType,
      isAffiliate,
      code,
    });

    if (this.state$.hasChooseProcedureString === EState.REGISTER) {
      delete payload.code;
    }

    this.loaderState.open();
    this.httpValidation.query(payload, recaptcha).subscribe(
      (data) => this.sucessRequest(data, !!parseInt(isAffiliate, 10)),
      (error) => this.failRequest(error)
    );
  }
  requestProcces(values: IAffiliates) {
    const { recaptcha, code, documentType, documentNumber, birthdate } = values;
    const payload = this.handlerPayload({
      requestNumber: code,
      documentType,
      documentNumber,
      birthdate,
    });
    this.loaderState.open();

    this.httpValidation.requestProcces(payload, recaptcha).subscribe(
      (data) => this.sucessRequestProcedure(data),
      (error) => this.failRequestProcedure(error)
    );
  }

  getProcedure(values: IAffiliates) {
    const { recaptcha, code, documentType, documentNumber, birthdate } = values;
    const payload = this.handlerPayload({
      requestNumber: code,
      documentType,
      documentNumber,
      birthdate,
    });

    this.loaderState.open();
    const signature = this.state$.hasActiveSessionString;
    this.httpProcedure.getProcedure(payload, recaptcha, signature).subscribe(
      (data) => this.sucessRequestProcedure(data),
      (error) => this.failRequestProcedure(error)
    );
  }

  nextStep(values: IAffiliates) {
    if (this.state$.hasChooseProcedureString === EState.QUERY) {
      this.router.navigate(['/tramite']);
    } else {
      this.router.navigate(['/registro']);
    }
  }

  backStep() {
    this.router.navigate(['/tipo-de-tramite']);
  }

  private sucessRequest(response: IValidation, isAffiliate: boolean) {
    this.state$.action({
      affiliate: response,
      isAffiliate,
      signature: response.signature,
    });
    this.loaderState.close();
  }

  private failRequest(error: object) {
    this.loaderState.close();
    this.modal.show('notFound', { width: '662px', height: '390px' });
  }

  private sucessRequestProcedure(response: any) {
    this.state$.action({ procedure: response, signature: response.signature });
    this.loaderState.close();
  }

  private failRequestProcedure(error: object) {
    this.loaderState.close();
    this.modal.show('notFound', { width: '662px', height: '390px' });
  }

  private handlerPayload(params) {
    const date = new Date(params.birthdate);
    let day: string = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    day = +day < 10 ? '0' + day : day;
    month = +month < 10 ? '0' + month : month;
    const clone = Object.assign({}, params);
    clone.birthdate = `${day}/${month}/${date.getFullYear()}`;
    const { recaptcha, ...payload } = clone;

    return payload;
  }
}
