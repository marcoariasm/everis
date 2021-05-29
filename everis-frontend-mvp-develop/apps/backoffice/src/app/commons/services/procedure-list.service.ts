import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpProcedureList {
  // ENDPOINTS
  private url = `${environment.url}/backoffice-request-tray/v1/tray`;

  constructor(private http: HttpClient) {}

  getTray(data, signature: string = ''): Observable<any> {
    return this.http
      .post<any>(this.url, data, {
        observe: 'body',
        headers: {
          'x-prima-signature': signature,
        },
      })
      .pipe(map((response) => response));
  }
}
