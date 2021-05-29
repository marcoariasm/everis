import {Component, OnDestroy, OnInit} from '@angular/core';
import { RequestState } from '@aafp/commons/state/request.state';
import { UIT } from '@aafp/commons/constants';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';
import {environment} from '@aafp/env/environment';
@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.component.html',
  styleUrls: ['./registro-exitoso.component.scss']
})
export class RegistroExitosoComponent implements OnInit, OnDestroy {

  public data: any;
  public uit = UIT;
  successData: any;
  afpType: string = null;
  constructor(private state: RequestState, private router: Router, private storage: SessionStorage) { }

  ngOnInit(): void {
    this.state.requestStepper$.subscribe(_ => this.data = _);
    this.state.request.subscribe(value => {
      this.afpType = value.afp;
      this.successData = value.requestSuccess;
    });
  }

  ngOnDestroy(): void {
    this.state.reset();
  }

  get amountAvailable() {
    return this.storage.get('amountAvailable') ? parseInt(this.storage.get('amountAvailable'), 10) : '';
  }

  get firstName() {
    return this.storage.get('firstName' || '');
  }

  get requestNumber() {
    return this.storage.get('requestNumber' || '');
  }

  public getCurrentDate() {
    const date = moment(new Date()).format('DD/MM/YYYY HH:mm:ss A');
    return date;
  }

  get amountWithdraw() {
    return this.data?.amountVoluntaryFund ?
      (parseInt(this.data.amountWithdraw, 10) - parseInt(this.data.amountVoluntaryFund, 10)) :
      this.data?.amountWithdraw;
  }

  goToHome() {
    this.storage.clear();
    if (!environment.production) {
      this.router.navigate(['/bienvenido']);
    } else {
      window.location.href = environment.urlLanding;
    }
  }

}
