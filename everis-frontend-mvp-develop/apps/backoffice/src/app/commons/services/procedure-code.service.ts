import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProcedureCode {
  // ENDPOINTS
  private url = `${environment.url}/backoffice-request-resend/v1/resend`;

  constructor(private http: HttpClient) {}

  getNewProcedureCode(data): Observable<any> {
    return this.http.post(this.url, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
