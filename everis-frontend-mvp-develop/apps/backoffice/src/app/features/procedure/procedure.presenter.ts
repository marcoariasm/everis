import { Injectable } from '@angular/core';
import { RequestState } from '@backoffice/commons/state/request.state';
import { ProcedureCode } from '@backoffice/commons/services/procedure-code.service';
import { ModalManager } from '@backoffice/commons/modal-manager/modal-manager';
import { LoaderState } from '@backoffice/commons/state/loader.state';
@Injectable()
export class ProcedurePresenter {
  procedure;
  user = JSON.parse(sessionStorage.getItem('currentUser'));

  constructor(
    private state$: RequestState,
    private procedureCode: ProcedureCode,
    private modal: ModalManager,
    private loaderState: LoaderState,
  ) {
    this.state$.request.subscribe(res => {
      this.procedure = res;
    })
  }

  setProcedureDetailRQ() {
    return {
      requestId: this.procedure.id,
      login: this.user.login,
    }
  }

  setCommunicationRQ(comment: string, file, fileName) {
    return {
      login: this.user.login,
      requestId: this.procedure.id,
      comment,
      file,
      fileName,
      affiliateId: this.procedure.affiliateId,
      executiveId: this.user.id,
    }
  }

  setChangeStatusRQ(form) {
    const { status, reason } = form;

    return {
      login: this.user.login,
      requestId: this.procedure.id,
      executiveId: this.user.id,
      statusId: status,
      reasonId: reason,
    }
  }

  requestProcedureCode() {
    this.procedureCode.getNewProcedureCode(this.setProcedureDetailRQ()).subscribe(
      resp => this.successRequestFullProcedureCode(),
      error => this.failRequestProcedureCode(error)
    );
  }

  successRequestFullProcedureCode() {
    this.modal.show('procedureCode', {data: true});
  }

  failRequestProcedureCode(error) {
    this.modal.show('procedureCode', {data: false});
  }
}
