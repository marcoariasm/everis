import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-initial-banner',
  templateUrl: './initial-banner.component.html',
  styleUrls: ['./initial-banner.component.scss']
})
export class InitialBannerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InitialBannerComponent>,
  ) { }

  ngOnInit(): void {
  }

}
