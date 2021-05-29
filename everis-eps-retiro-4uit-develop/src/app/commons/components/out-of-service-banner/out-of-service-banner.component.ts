import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '@aafp/env/environment';

@Component({
  selector: 'app-out-of-service-banner',
  templateUrl: './out-of-service-banner.component.html',
  styleUrls: ['./out-of-service-banner.component.scss']
})
export class OutOfServiceBannerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OutOfServiceBannerComponent>,
  ) { }

  ngOnInit(): void {
  }

  exit(): void {
    this.navigateTo(environment.urlLanding);
  }

  private navigateTo(urlRedirect: string): void {
    window.open(urlRedirect, '_self');
  }
}
