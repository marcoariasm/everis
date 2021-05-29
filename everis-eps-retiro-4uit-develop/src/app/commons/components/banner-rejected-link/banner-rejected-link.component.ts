import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '@aafp/env/environment';

@Component({
  selector: 'app-banner-rejected-link',
  templateUrl: './banner-rejected-link.component.html',
  styleUrls: ['./banner-rejected-link.component.scss']
})
export class BannerRejectedLinkComponent implements OnInit {

  info: any;

  constructor(
    public dialogRef: MatDialogRef<BannerRejectedLinkComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }

  ngOnInit(): void {
  }

  exit(): void {
    if (this.info.title === 'REDIRECT_LANDING') {
      this.navigateTo(environment.urlLanding);
    }

    if (this.info.reset === true) {
      this.router.navigate(['/consulta']);
    }
    this.dialogRef.close();
  }

  private navigateTo(urlRedirect: string) {
    window.open(urlRedirect, '_self');
  }
}
