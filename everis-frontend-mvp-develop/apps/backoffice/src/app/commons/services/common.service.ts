import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private urlType = `${environment.url}/backoffice-type-request/v1/backoffice-type-request`;

  constructor(private http: HttpClient) {}

  getTypeRequest(params, signature): Observable<any> {
    return this.http.post<any>(
      this.urlType,
      { login: params },
      {
        headers: {
          'x-prima-signature': signature,
        },
      }
    );
  }
}
