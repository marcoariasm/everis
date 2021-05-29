import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-banner-amount-confirm',
  templateUrl: './banner-amount-confirm.component.html',
  styleUrls: ['./banner-amount-confirm.component.scss']
})
export class BannerAmountConfirmComponent implements OnInit {

  info: any;

  constructor(
    public dialogRef: MatDialogRef<BannerAmountConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }


  ngOnInit(): void {

  }

  update(): void {
    this.dialogRef.close();
  }

  continue() {
    this.info.onClose();
    this.dialogRef.close();
  }

}
