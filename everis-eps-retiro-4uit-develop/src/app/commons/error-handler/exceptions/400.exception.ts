import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { Injectable } from '@angular/core';
import { DataException, IException } from '@ecnf/ng-microkernel/error-handler';
import { Logger } from '@ecnf/ng-microkernel/logger';
import { PayloadErrorResponse } from '../error-handler.interfaces';
import { Router } from '@angular/router';
import { ERROR_MESSAGES } from '../messages/messages.constant';
import { ModalRejectModel } from '@aafp/commons/models';

@Injectable()
export class HttpCode400Exception implements IException<object> {
  constructor(private logger: Logger, private router: Router, private modal: ModalManager ) {}
  fire(httpCode, data: DataException<PayloadErrorResponse>) {
    this.logger.warn(`Ocurrió una exception para http code ${httpCode}`, data);
    if (data.body.code === 'AFP500') {
      this.modal.show('reject', { data: { content: ERROR_MESSAGES[data.body.code]}});
      return;
    }

    if (ERROR_MESSAGES[data.body.code]) {
      this.modal.show('reject', { data: { content: ERROR_MESSAGES[data.body.code], textButton: 'Cerrar'}});
    } else {
      this.modal.show('rejectLink', { data: new ModalRejectModel('USER_NOT_FOUND', 'REDIRECT_LANDING') });
    }
  }
}
