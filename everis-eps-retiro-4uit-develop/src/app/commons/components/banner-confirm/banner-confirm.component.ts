import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { RequestState } from '@aafp/commons/state/request.state';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Component({
  selector: 'app-banner-confirm',
  templateUrl: './banner-confirm.component.html',
  styleUrls: ['./banner-confirm.component.scss']
})
export class BannerConfirmComponent implements OnInit {
  request$ = this.requestState.request;
  info: any;

  constructor(
    public dialogRef: MatDialogRef<BannerConfirmComponent>,
    private router: Router,
    private requestState: RequestState,
    @Inject(MAT_DIALOG_DATA) public data,
    private storage: SessionStorage
  ) {
    this.info = data;
  }

  ngOnInit(): void {
  }

  next(): void {
    const navigatePath = this.retentionFlag === 1 ? '/libre-disponibilidad-aporte' : '/libre-disponibilidad';
    this.router.navigate([navigatePath]);
    this.dialogRef.close();
  }

  back(): void {
    this.dialogRef.close();
  }
  validateAmount(): string {
    const amountAvailable = this.info ? this.info.response.amountAvailable : null;
    if (+amountAvailable <= 50) {
        return 'Sí accedes al retiro. Considera que el monto disponible es menor a S/ 50.';
    } else {
      return 'Sí accedes al retiro.';
    }
  }

  get retentionFlag() {
    const retention = this.storage.get('retentionFlag');
    return parseInt(retention);
  }

}
