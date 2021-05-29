import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { RequestModel } from '@aafp/commons/models';
import { EState } from '@aafp/commons/enums';

@Injectable({
  providedIn: 'root'
})
export class RequestState {
  private requestState = new BehaviorSubject<RequestModel>(new RequestModel());
  private requestStepper = new BehaviorSubject<any>(null);
  private signature = '';

  public requestStepper$ = this.requestStepper.asObservable();

  get hasActiveSession() {
    return this.signature !== '' ? true : false;
  }

  get hasActiveSessionString() {
    return this.signature;
  }

  get request() {
    return this.requestState.asObservable();
  }

  set requestStepperCurrent(data: any) {
    this.requestStepper.next(data);
  }

  update(state: RequestModel) {
    this.signature = state.signature !== '' ? state.signature : '';
    this.requestState.next(state);
  }

  action(state: any, type: string) {
    const dataState: any = { ...(this.requestState.value || {}) };
    switch (type) {
      case EState.QUESTIONS:
        dataState.questions = state;
        break;
      case EState.AMOUNT:
        dataState.amountAvailable = state;
        break;
      case EState.ANSWERS:
        dataState.answers = state;
        break;
      case EState.FLOW:
        dataState.flow = state;
        break;
      case EState.SUBFLOW:
        dataState.subflow = state;
        break;
      case EState.AMOUNT_WITHDRAW:
        dataState.amountWithdraw = state;
        break;
      case EState.FILE_NAME:
        dataState.filename = state;
        break;
      case EState.REQUEST_SUCCESS:
        dataState.requestSuccess = state;
        break;
      case EState.ACCOUNT_STATEMENT:
        dataState.accountStatusFlag = state;
        break;
      default:
        break;
    }

    this.requestState.next(dataState);
  }

  reset() {
    this.signature = '';
    this.requestState.next(new RequestModel());
  }
}
