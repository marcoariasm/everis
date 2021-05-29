import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { ModalRejectModel } from '@aafp/commons/models';
import { Injectable } from '@angular/core';
import { DataException, IException } from '@ecnf/ng-microkernel/error-handler';
import { Logger } from '@ecnf/ng-microkernel/logger';
import { ERROR_MESSAGES } from '../messages/messages.constant';
import { PayloadErrorResponse } from '../error-handler.interfaces';

@Injectable()
export class HttpCode404Exception implements IException<object> {
  constructor(private logger: Logger,  private modal: ModalManager ) {}
  fire(httpCode, data: DataException<PayloadErrorResponse>) {
    this.logger.warn(`Ocurrio una exception para http code ${httpCode}`, data);

    if (data.body.code === 'AFP501') {
      this.modal.show('reject', { data: new ModalRejectModel(ERROR_MESSAGES[data.body.code], 'REDIRECT_LANDING') });
      return;
    }

    if (ERROR_MESSAGES[data.body.code]) {
      this.modal.show('reject', { data: { content: ERROR_MESSAGES[data.body.code], textButton: 'Cerrar'}});
    } else {
      this.modal.show('rejectLink', { data: new ModalRejectModel('USER_NOT_FOUND', 'REDIRECT_LANDING') });
    }
  }
}
