import {Component, OnInit} from '@angular/core';
import {UIT} from '@aafp/commons/constants';
import {Router} from '@angular/router';
import {ITracingDetail} from '@aafp/commons/interfaces/tracing.interface';
import {ApiSeguimiento} from '@aafp/commons/http/seguimiento.http';
import {environment} from '@aafp/env/environment';

@Component({
  selector: 'app-resultado-seguimiento',
  templateUrl: './resultado-seguimiento.component.html',
  styleUrls: ['./resultado-seguimiento.component.scss']
})
export class ResultadoSeguimientoComponent implements OnInit {
  afpType = {
    integra: 'INTEGRA',
    prima: 'PRIMA',
    profuturo: 'PROFUTURO'
  };
  tracingDetail: ITracingDetail;
  public data: any;
  public uit = UIT;

  constructor(
    private router: Router,
    private apiSeguimiento: ApiSeguimiento
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    if (this.apiSeguimiento.tracingDetail) {
      this.tracingDetail = this.apiSeguimiento.tracingDetail;
    } else {
      this.goToHome();
    }
  }

  goToHome() {
    if (!environment.production) {
      this.router.navigate(['/bienvenido']);
    } else {
      window.location.href = environment.urlLanding;
    }
  }

}
