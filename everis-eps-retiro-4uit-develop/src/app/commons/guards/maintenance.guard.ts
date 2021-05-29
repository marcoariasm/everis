import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ApiMaintenanceRequest } from '@aafp/commons/http/maintenance.http';
import { environment } from '@aafp/env/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {

  constructor(
    private router: Router,
    private apiMaintenanceRequest: ApiMaintenanceRequest
  ) { }

  async canActivate(): Promise<boolean> {
    if (environment.production) {
      return this.apiMaintenanceRequest.requestMaintenance().then(() => {

        return true;
      }).catch(() => {
        this.router.navigate(['/mantenimiento']);

        return false;
      });
    } else {
      const p = Promise.resolve();

      return p.then(() => {

        return true;
      });
    }
  }
}
