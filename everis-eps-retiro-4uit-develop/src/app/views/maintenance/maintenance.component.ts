import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoaderState } from 'src/app/commons/state/loader.state';
import { ApiMaintenanceRequest } from '@aafp/commons/http/maintenance.http';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  providers: [ApiMaintenanceRequest]
})
export class MaintenanceComponent  {
  ready: boolean;

  constructor(
    private loaderState: LoaderState,
    private router: Router,
    private apiMaintenanceRequest: ApiMaintenanceRequest
  ) {
    this.loaderState.open();
    this.apiMaintenanceRequest.requestMaintenance().then(() => {
      this.router.navigate(['/consulta']);
      this.loaderState.close();
    }).catch(() => {
      this.ready = true;
      this.loaderState.close();
    });
  }
}
