import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IAdminFlow } from '@everis-afp-prima/data';

@Injectable({
  providedIn: 'root'
})
export class RequestState {
  private requestState = new BehaviorSubject({});
  private signature: string;

  get hasActiveSession() {
    return !!this.signature;
  }

  get hasActiveSessionString() {
    return this.signature;
  }

  get request() {
    return this.requestState.asObservable();
  }

  action(state: IAdminFlow) {
    const dataState = { ...(this.requestState.value || {}), ...state };

    this.signature = dataState.signature || '';
    this.requestState.next(dataState);
  }

  reset() {
    this.signature = '';
    this.requestState.next({});
  }
}
