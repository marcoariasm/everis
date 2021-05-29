import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';

@Injectable({
  providedIn: 'root',
})
export class ExecutiveService {
  constructor(private http: HttpClient) {}

  private url = `${environment.url}/backoffice-executive/v1/executive`;

  listExecutive(data): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
