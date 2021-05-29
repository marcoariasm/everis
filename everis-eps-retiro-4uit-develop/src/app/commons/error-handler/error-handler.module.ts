import { environment } from '@aafp/env/environment';
import { NgModule } from '@angular/core';
import { ErrorHandlerModule } from '@ecnf/ng-microkernel/error-handler';
import { ELoggerLevels, LoggerModule } from '@ecnf/ng-microkernel/logger';
import { HttpCode404Exception } from './exceptions/404.exception';
import { HttpCode412Exception } from './exceptions/412.exception';
import { HttpCode401Exception } from './exceptions/401.exception';
import { HttpCode402Exception } from './exceptions/402.exception';
import { DefaultException } from './exceptions/default.exception';
import { HttpCode503Exception } from './exceptions/503.exception';

@NgModule({
  imports: [
    LoggerModule.forRoot({
    level: ELoggerLevels.DEBUG,
    }),
    ErrorHandlerModule.forRoot({
      codeResponse: 'code',
      production: environment.production,
      defaultException: DefaultException,
      exceptions: [
        {
          nameCode: ['404'],
          exception: HttpCode404Exception,
        },
        {
          nameCode: ['412'],
          exception: HttpCode412Exception,
        },
        {
          nameCode: ['401'],
          exception: HttpCode401Exception,
        },
        {
          nameCode: ['402'],
          exception: HttpCode402Exception,
        },
        {
          nameCode: ['503'],
          exception: HttpCode503Exception,
        }
      ]
    }),
  ],
  providers: [HttpCode404Exception, HttpCode412Exception, HttpCode401Exception, HttpCode402Exception, HttpCode503Exception, DefaultException],
  exports: [ErrorHandlerModule, LoggerModule]
})
export class AfpErrorHandler  {}
