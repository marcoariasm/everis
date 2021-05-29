import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { Injectable } from '@angular/core';
import { DataException, IException } from '@ecnf/ng-microkernel/error-handler';
import { Logger } from '@ecnf/ng-microkernel/logger';
import { PayloadErrorResponse } from '../error-handler.interfaces';
import { Router } from '@angular/router';
import { ERROR_MESSAGES } from '../messages/messages.constant';
import { ModalRejectModel } from '@aafp/commons/models';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Injectable()
export class HttpCode401Exception implements IException<object> {
  constructor(
    private logger: Logger,
    private router: Router,
    private modal: ModalManager,
    private storage: SessionStorage,
  ) {}
  fire(httpCode, data: DataException<PayloadErrorResponse>) {
    this.logger.warn(`Ocurrió una exception para http code ${httpCode}`, data);
    if (data.body.code === 'AFP4007') {
      this.modal.show('reject', { data: new ModalRejectModel(ERROR_MESSAGES[data.body.code], 'REDIRECT_LANDING') });
      return;
    }
    if (data.body.code === 'AFP3003') {

      if (this.router.url === '/consulta') {
        this.modal.show('confirmBlocked',
         { data: { acceddCode: 'AFP3003', content: ERROR_MESSAGES['AFP3003-1'], textButton: 'Registrar Solicitud'} });

        return;
      }

      this.modal.show('reject', { data: { content: ERROR_MESSAGES[data.body.code], textButton: 'Cerrar'} });

      return;
    }

    if (data.body.code === 'AFP3004') {
      this.modal.show('reject', { data: { content: ERROR_MESSAGES[data.body.code], textButton: 'Cerrar'}});
      return;
    }
    if (data.body.code === 'AFP3006') {
      this.modal.show('reject', { data: { content: ERROR_MESSAGES[data.body.code], textButton: 'Cerrar'} });
      return;
    }
    if (data.body.code === 'AFP3002' || data.body.code === 'AFP3005') {
      this.router.navigate(['/preguntas']);
      return;
    }

    if (data.body.meta) {
      this.storage.set('validationIdentity', data.body.meta.validationIdentity);
    }
    this.router.navigate(['/verificacion-identidad']);
  }
}
