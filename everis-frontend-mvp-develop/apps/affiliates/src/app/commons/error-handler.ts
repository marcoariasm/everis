import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (!environment.production) {
      throw error;
    }
    this.sendReport(error);
  }
  private sendReport(e: Error) {}
}
