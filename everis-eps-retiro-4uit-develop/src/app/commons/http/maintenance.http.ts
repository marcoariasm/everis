import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@aafp/env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiMaintenanceRequest {
  constructor(private http: HttpClient) { }

  requestMaintenance() {
    const urlMaintenance = `${environment.url}/verify4uit`;

    return this.http.get(urlMaintenance, {
      observe: 'body'
    })
    .toPromise();
  }
  requestMaintenanceTracing() {
    const urlMaintenance = `${environment.url}/verifyTracing`;

    return this.http.get(urlMaintenance, {
      observe: 'body'
    })
      .toPromise();
  }
}
