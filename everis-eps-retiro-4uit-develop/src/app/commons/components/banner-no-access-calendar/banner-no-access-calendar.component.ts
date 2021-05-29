import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RequestState } from '@aafp/commons/state/request.state';

@Component({
  selector: 'app-banner-no-access-calendar',
  templateUrl: './banner-no-access-calendar.component.html',
  styleUrls: ['./banner-no-access-calendar.component.scss']
})
export class BannerNoAccessCalendar implements OnInit {
  request$ = this.requestState.request;
  info: any;

  constructor(
    public dialogRef: MatDialogRef<BannerNoAccessCalendar>,
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
