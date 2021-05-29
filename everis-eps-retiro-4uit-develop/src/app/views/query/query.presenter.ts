import { Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Availability } from '../../commons/http/availability.http';
import { RequestState } from '../../commons/state/request.state';
import { ModalManager } from '../../commons/modal-manager/modal-manager';
import { LoaderState } from 'src/app/commons/state/loader.state';
import { AppValidators } from '../../commons/validators/validators';
import { environment } from '@aafp/env/environment';

@Injectable()
export class QueryPresenter {
  request$ = this.requestState.request;
  subscription = new Subscription();
  flowType: string;

  constructor(
    private availability: Availability,
    private requestState: RequestState,
    private modal: ModalManager,
    private loaderState: LoaderState
  ) { }

  checkBeneficiary(params: any) {
    const { recaptcha, flowType } = params;
    this.flowType = flowType;
    const payload = this.handlerPayload(params);

    // if (this.calendarValidator(params.documentNumber) === false) {
    //   const openOtherModal = true;
    //   this.modal.show('reject', { data: new ModalRejectModel('NO_ACCESS_CALEDNAR', '', [], false, openOtherModal ) });
    //   return;
    // }

    this.loaderState.open();
    this.requestState.update(payload);
    this.availability
      .query(payload, recaptcha)
      .subscribe(
        data => this.sucessRequest(data),
        error => {
          this.loaderState.close();
          payload.afp = error.error.meta ? error.error.meta?.afp : 'PRIMA';
          payload.accessFlag4Uit = error.error.meta ? error.error.meta?.accessFlag4Uit : '3';
          this.requestState.update(payload);
        }
      );
  }

  showBannerCalendar() {
    this.modal.show('initial', { width: '50vw' });
  }

  showModalContentInfo() {
    this.modal.show('content', { width: '30vw' });
  }

  calendarValidator(value: string): boolean {
    if (environment.config.skipCalendar) {
      return true;
    } else {
      const allowedDays = {
        0: [5, 12],
        1: [5, 12],
        2: [8, 15],
        3: [8, 15],
        4: [9, 16],
        5: [9, 16],
        6: [10, 17],
        7: [10, 17],
        8: [11, 18],
        9: [11, 18],
        others: [5, 12],
        month: [11]
      };
      const temp = value.slice(-1);
      const d = new Date();
      const month = d.getMonth() + 1;
      const day = d.getDate();

      if (month === allowedDays.month[0]) {
        if (AppValidators.isNumber(temp)) {
          return allowedDays[temp].includes(day);
        } else {
          if (AppValidators.allLetters(temp)) {
            return allowedDays.others.includes(day);
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    }
  }

  private handlerPayload(params) {
    const date = new Date(params.birthdate);
    let day: string = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    day = +day < 10 ? '0' + day : day;
    month = +month < 10 ? '0' + month : month;
    delete params.flowType;
    const clone = Object.assign({}, params);
    clone.birthdate = `${date.getFullYear()}-${month}-${day}`;
    clone.documentType = params.documentType;
    const { recaptcha, ...payload } = clone;

    return payload;
  }

  private sucessRequest(response: any) {
    this.loaderState.close();
    response.flow = this.flowType;
    this.requestState.update(response);
    this.modal.show('confirm', { data: { response } });
  }
}
