import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
//import { ModalManager } from '../../modal-manager/modal-manager';
import { environment } from '@aafp/env/environment';

@Component({
  selector: 'app-banner-rejected',
  templateUrl: './banner-rejected.component.html',
  styleUrls: ['./banner-rejected.component.scss']
})
export class BannerRejectedComponent implements OnInit {

  info: any;

  constructor(
    public dialogRef: MatDialogRef<BannerRejectedComponent>,
    private router: Router,
    //private modal: ModalManager,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }

  ngOnInit(): void {
    
  }

  exit(): void {
    const callback = this.info.callback;

    if (this.info.title === 'REDIRECT_LANDING') {
      this.navigateTo(environment.urlLanding);
    }

    if (this.info.reset === true) {
      this.router.navigate(['/consulta']);
    }

    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      if (callback) {
        callback.apply(this);
      }
    });
  }

  private navigateTo(urlRedirect: string) {
    window.open(urlRedirect, '_self');
  }

}
