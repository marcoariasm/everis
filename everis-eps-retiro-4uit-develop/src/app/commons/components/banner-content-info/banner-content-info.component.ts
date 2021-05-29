import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-banner-content-info',
  templateUrl: './banner-content-info.component.html',
  styleUrls: ['./banner-content-info.scss'],
})
export class BannerContentInfoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BannerContentInfoComponent>) {}

  ngOnInit(): void {}

  back(): void {
    this.dialogRef.close();
  }
}
