import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { RequestState } from '@aafp/commons/state/request.state';
import { EState, EFlow, ESubFlow } from '@aafp/commons/enums';

@Component({
  selector: 'app-banner-confirm-25',
  templateUrl: './banner-confirm-25.component.html',
  styleUrls: ['./banner-confirm-25.component.scss']
})
export class BannerConfirm25Component implements OnInit {
  request$ = this.requestState.request;
  info: any;

  constructor(
    public dialogRef: MatDialogRef<BannerConfirm25Component>,
    private router: Router,
    private requestState: RequestState,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }

  ngOnInit(): void {
  }

  next25Percent(): void {
    this.requestState.action(EFlow.FLOW25PERCENT, EState.FLOW);
    this.router.navigate(['/identificacion']);
    this.dialogRef.close();
  }

  back(): void {
    this.dialogRef.close();
  }

}
