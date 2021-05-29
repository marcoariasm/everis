import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { ModalRejectModel } from '@aafp/commons/models';
import { Injectable } from '@angular/core';
import { DataException, IException } from '@ecnf/ng-microkernel/error-handler';
import { Logger } from '@ecnf/ng-microkernel/logger';
import { ERROR_MESSAGES } from '../messages/messages.constant';
import { PayloadErrorResponse } from '../error-handler.interfaces';

@Injectable()
export class HttpCode412Exception implements IException<object> {
  constructor(private logger: Logger,  private modal: ModalManager ) {}
  fire(httpCode, data: DataException<PayloadErrorResponse>) {
    this.logger.warn(`Ocurrió una exception para http code ${httpCode}`, data);

    if (data.body.code === 'AFP3016') {
      ERROR_MESSAGES[data.body.code] = ERROR_MESSAGES[data.body.code] + data.body.meta.reasonNoAccess;
      this.modal.show('reject', { data: new ModalRejectModel(ERROR_MESSAGES[data.body.code], 'REDIRECT_LANDING') });
      return;
    }

    if (data.body.code === 'AFP3011') {
      this.modal.show('reject', { data: new ModalRejectModel(ERROR_MESSAGES[data.body.code], 'REDIRECT_LANDING') });
      return;
    }

    if (['AFP3031', 'AFP3032', 'AFP3033', 'AFP3034'].indexOf(data.body.code) !== -1) {
      return this.modal.show('reject', { data: new ModalRejectModel(ERROR_MESSAGES[`${data.body.code}-${data.body.meta.accessFlag4Uit}`], 'REDIRECT_LANDING') });
    }

    if (data.body.code === 'AFP502' || data.body.code === 'AFP401') {
      this.modal.show('reject', { data: new ModalRejectModel(ERROR_MESSAGES[data.body.code], 'REDIRECT_LANDING') });
      return;
    }

    if (data.body.code === 'AFP1001') {
      return;
    }

    if ( data.body.code === 'AFP3013' ) {
      const accesFlag = data.body.meta.accessFlag4Uit;
      const reason = data.body.meta.accessFlag4Uit === '5' ? data.body.meta.reasonNoAccess : '';
      this.modal.show('noAccessCalendar',
      { data: { message: ERROR_MESSAGES[`${data.body.code}-acessFlag-${accesFlag}`], flag: accesFlag, reason}});

      return;
    }

    if (ERROR_MESSAGES[data.body.code]) {
      this.modal.show('reject', { data: { content: ERROR_MESSAGES[data.body.code]}});
    } else {
      this.modal.show('reject', { data: new ModalRejectModel('GENERIC_ERROR', 'REDIRECT_LANDING') });
    }
  }
}
