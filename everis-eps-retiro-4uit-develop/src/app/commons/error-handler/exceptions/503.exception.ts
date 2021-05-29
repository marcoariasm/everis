import { Injectable } from '@angular/core';
import { DataException, IException } from '@ecnf/ng-microkernel/error-handler';
import { Logger } from '@ecnf/ng-microkernel/logger';
import { PayloadErrorResponse } from '../error-handler.interfaces';
import { Router } from '@angular/router';

@Injectable()
export class HttpCode503Exception implements IException<object> {
  constructor(private logger: Logger, private router: Router ) {}
  fire(httpCode, data: DataException<PayloadErrorResponse>) {
    this.logger.warn(`Ocurrio una exception para http code ${httpCode}`, data);
    return;
  }
}
