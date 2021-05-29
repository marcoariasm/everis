import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-banner-confirm-clave-afp',
  templateUrl: './banner-confirm-clave-afp.component.html',
  styleUrls: ['./banner-confirm-clave-afp.component.scss']
})
export class BannerConfirmClaveAfpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BannerConfirmClaveAfpComponent>) { }

  ngOnInit(): void {
  }

  back(): void {
    this.dialogRef.close();
  }

}
