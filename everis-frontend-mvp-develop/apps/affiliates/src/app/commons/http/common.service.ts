import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@affiliates/env/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private urlType = `${environment.url}/affiliate-type-request/v1/type-request`;

  constructor(private http: HttpClient) {}

  getTypeRequest(params, signature): Observable<any> {
    return this.http.post<any>(this.urlType, params, {
      headers: {
        'x-prima-signature': signature,
      },
    });
  }
}
