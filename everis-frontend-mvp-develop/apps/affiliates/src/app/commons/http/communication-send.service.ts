import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '@affiliates/env/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpProcedureCommunication {
  // ENDPOINTS
  private url = `${environment.url}/affiliate-request-communication/v1/request-communication`;

  constructor(private http: HttpClient) {}

  sendMessage(params): Observable<any> {
    const { body, headers } = params;

    return this.http
      .post<any>(this.url, body, { headers })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
