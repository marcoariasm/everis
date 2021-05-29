import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IFlow } from '@everis-afp-prima/data';

@Injectable({
  providedIn: 'root'
})
export class RequestState {
  private requestState = new BehaviorSubject({} as IFlow);
  private signature: string;
  private chooseProcedure: string;

  get hasActiveSession() {
    return !!this.signature;
  }

  get hasChooseProcedure() {
    return !!this.chooseProcedure;
  }

  get hasChooseProcedureString() {
    return this.chooseProcedure;
  }

  get hasActiveSessionString() {
    return this.signature;
  }

  get request() {
    return this.requestState.asObservable();
  }

  action(state: IFlow) {
    const dataState = { ...(this.requestState.value || {}), ...state };

    this.signature = dataState.signature || '';
    this.chooseProcedure = dataState.chooseProcedure?.typeProcedure || '';
    this.requestState.next(dataState);
  }

  reset() {
    this.signature = '';
    this.requestState.next({});
  }
}
