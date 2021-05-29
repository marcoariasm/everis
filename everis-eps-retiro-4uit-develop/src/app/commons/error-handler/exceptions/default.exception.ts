import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { ModalRejectModel } from '@aafp/commons/models';
import { Injectable } from '@angular/core';
import { DataException, IException } from '@ecnf/ng-microkernel/error-handler';
import { Logger } from '@ecnf/ng-microkernel/logger';
import { PayloadErrorResponse } from '../error-handler.interfaces';
import { Router } from '@angular/router';

@Injectable()
export class DefaultException implements IException<object> {
  constructor(private logger: Logger,  private modal: ModalManager, private router: Router ) {}
  fire(httpCode, data: DataException<PayloadErrorResponse>) {

    const url = this.router.url.toLowerCase();

    this.logger.warn(`Ocurrio una exception para http code ${httpCode}`, data);

    if (url === '/consulta') {
      this.modal.show('reject', { data: new ModalRejectModel('QUERY_GENERIC_ERROR', 'REDIRECT_LANDING') });
      return;
    } else {
      this.modal.show('reject', { data: new ModalRejectModel('GENERIC_ERROR', 'REDIRECT_LANDING') });
    }
  }
}
