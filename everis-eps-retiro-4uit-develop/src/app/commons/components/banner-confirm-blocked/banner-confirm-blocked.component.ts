import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RequestState } from '@aafp/commons/state/request.state';

@Component({
  selector: 'app-banner-confirm-blocked',
  templateUrl: './banner-confirm-blocked.component.html',
  styleUrls: ['./banner-confirm-blocked.component.scss']
})
export class BannerConfirmBlockedComponent implements OnInit {
  request$ = this.requestState.request;
  info: any;

  constructor(
    public dialogRef: MatDialogRef<BannerConfirmBlockedComponent>,
    private requestState: RequestState,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }

  ngOnInit(): void {
  }

  back(): void {
    this.dialogRef.close();
  }

}
