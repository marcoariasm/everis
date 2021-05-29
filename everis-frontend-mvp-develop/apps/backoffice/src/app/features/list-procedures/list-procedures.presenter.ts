import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestState } from '@backoffice/commons/state/request.state';

@Injectable()
export class ListProceduresPresenter {
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  constructor(
    private router: Router,
    private state$: RequestState,
  ) {
  }

  open(procedure) {
    this.state$.action({...procedure});
    this.router.navigate(['/tramite']);
  }

  setAssignmentRQ(procedure) {
    return {
      login: this.user.login,
      requestId: procedure.id,
      executiveId: this.user.id
    }
  }
}
