import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITypeProcedure } from '@everis-afp-prima/data';
import { RequestState } from '@affiliates/commons/state/request.state';


@Injectable()
export class ChooseProcedurePresenter {
  state$ = this.requestState;

  constructor(
    private requestState: RequestState,
    private router: Router
  ) { }

  chooseProcedure(value: ITypeProcedure) {
    this.state$.action({ chooseProcedure: value });
    this.router.navigate(['/validacion']);
  }

  reset() {
    this.state$.reset();
  }
}
