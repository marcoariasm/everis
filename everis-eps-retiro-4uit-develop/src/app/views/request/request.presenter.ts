import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { interval } from 'rxjs';

import { RequestState } from '@aafp/commons/state/request.state';
import { ApiRequest } from '@aafp/commons/http/request.http';
import { Ubigeo } from '@aafp/commons/http/ubigeo.http';
import { ModalRejectModel, TypeAccesCode } from '@aafp/commons/models/modal-reject.model';
import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { LoaderState } from '@aafp/commons/state/loader.state';
import { IAffiliate } from '@aafp/commons/interfaces';
import ubigeoGrouped from '@aafp/data/ubigeo.grouped.json';

@Injectable()
export class RequesPresenter {
  request$ = this.requestState.request;
  private ubigeoGrouped: any = ubigeoGrouped;

  constructor(
    private request: ApiRequest,
    private requestState: RequestState,
    private loaderState: LoaderState,
    private modal: ModalManager,
    private ubigeo: Ubigeo,
  ) { }

  async registerRequest(params, accountStatement: boolean) {
    params.departamento = undefined;
    params.provincia = undefined;
    params.accountStatement = accountStatement ? 1 : 0;
    const request = await this.stateData(params);
    const { signature, ...body } = request;
    const newBody = this.prepareBody(body);
    this.loaderState.open();
    this.request.register(newBody)
      .pipe(map(data => this.prepareDateRequest(data)))
      .subscribe(
        data => this.sucessRequest(data),
        error => this.failRequest(error)
      );
  }

  prepareBody(body: any) {
    const newBody = body;
    delete newBody.flow;
    delete newBody.subflow;
    delete newBody.questions;
    delete newBody.answers;
    delete newBody.positiveBalance;
    delete newBody.potentialRetention;

    return newBody;
  }

  showModalNotBank(value: string, ubigeo: string, affiliate: IAffiliate) {
    const { afp } = affiliate;

    if (value === 'WINDOW_PAYMENT') {
      const {groupa = [] , groupb = []} = this.ubigeoGrouped;
      const existUbigeoA = groupa.includes(ubigeo);
      const existUbigeoB = groupb.includes(ubigeo);
      let data = {};

      if (existUbigeoA && !existUbigeoB) {
        data = new ModalRejectModel('NO_BANK_ACCOUNT', 'Información', [], false, false, 'Continuar');
      } else if (!existUbigeoA && existUbigeoB) {
        data = new ModalRejectModel('NO_BANK_ACCOUNT_GROUP_B', 'Información', [], false, false, 'Continuar');
      } else {
        if (afp === 'PROFUTURO') {
          data = new ModalRejectModel('NO_BANK_ACCOUNT_GROUP_NONE_PROFUTURO', 'Información', [], false, false, 'Continuar');
        } else {
          data = new ModalRejectModel('NO_BANK_ACCOUNT_GROUP_NONE', 'Información', [], false, false, 'Continuar');
        }
      }

      this.modal.show('reject', { data });
    } else if (value === 'BANK_DEPOSIT') {
      const data = new ModalRejectModel('WITH_BANK_ACCOUNT', 'Información', [], false, false, 'Continuar');
      this.modal.show('reject', { data });
    }
  }

  showModalHelpBankAccount() {
    this.modal.show('reject', { data: new ModalRejectModel('HELP_VERIFY_BANK_ACCOUNT', undefined, [], false, false, 'Continuar') });
  }

  private async stateData(param) {
    let request;
    this.request$.subscribe(data => request = data);

    return await { ...request, ...param };
  }

  private prepareDateRequest(data) {
    const registerDate = data.registerDate ? data.registerDate.split('T') : [];
    // const date = new Date(data.registerDate);
    const date = registerDate.length > 0 ? registerDate[0].split('-').reverse().join('-') : '';
    const time = registerDate.length > 0 ? registerDate[1].substring(':', 5) : '';
    /*let day: string = date.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month = (date.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;*/

    return {
      number: data.requestNumber,
      date,
      time,
    };
  }

  private sucessRequest(response) {
    this.loaderState.close();
    const data = { reset: true, code: 'REQUEST_SUCCESS', ...response };
    this.modal.show('request', { width: '390px', data });
  }

  private failRequest(httpError) {
    this.loaderState.close();
    let errorCode: TypeAccesCode = 'REQUEST_NOT_PROCESS';

    if (httpError.status === 403) {
      errorCode = 'REQUEST_EXPIRY';
    } else if (httpError.status === 409) {
      errorCode = 'REQUEST_ALREADY_REGISTERED';
    } else if (httpError.status === 410) {
      if (httpError.error) {
        switch (httpError.error.code) {
          case 'AFP0004':
            errorCode = 'BANK_ACCOUNT_NUMBER_ALREADY_REGISTERED';
            break;
          case 'AFP0005':
            errorCode = 'EMAIL_ALREADY_REGISTERED';
            break;
          case 'AFP0006':
            errorCode = 'CELLPHONE_ALREADY_REGISTERED';
            break;
          default:
            break;
        }
      }
    }

    const title = httpError.status === 409 ? 'Solicitud existente' : '';
    let data: ModalRejectModel | object = new ModalRejectModel(errorCode, title, [], true);

    if (httpError.status === 409) {
      data = this.prepareDateRequest(httpError.error.meta);
      data = { reset: true, code: errorCode, ...data };
      this.modal.show('request', { width: '390px', data });

      return;
    }

    this.modal.show('reject', { data });
  }

  signatureExpire() {
    const seconds = 210 + 2;

    return interval(1000).pipe(
      take(seconds),
      map(value => {
        return seconds - value;
      }),
      map(value => {
        const res = {
          value,
          minutes: this._to2digit(Math.floor((value - 2) / 60)),
          seconds: this._to2digit(Math.floor((value - 2)) % 60),
        };

        return res;
      }));
  }

  _to2digit(n: number) {
    if (n > 0) {

      return ('00' + n).slice(-2);
    } else {

      return '00';
    }
  }

  openModalExpire() {
    const data = new ModalRejectModel('REQUEST_EXPIRY', 'REDIRECT_LANDING', [], true);
    this.requestState.reset();
    this.modal.show('reject', { data });
  }

  openModalGenericError(reset = false) {
    this.modal.show('reject', { data: new ModalRejectModel('GENERIC_ERROR', 'REDIRECT_LANDING', null, reset) });
  }

  getUbigeo(value = '') {
    this.loaderState.open();
    const data: { [param: string]: string; } = {};
    if (value !== '') {
      data.code = value;
    }

    return this.ubigeo.get(data, this.requestState.hasActiveSessionString);
  }
}
