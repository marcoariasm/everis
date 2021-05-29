import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-request',
  templateUrl: './banner-request.component.html',
  styleUrls: ['./banner-request.component.scss']
})
export class BannerRequestComponent implements OnInit {
  info;
  constructor(
    public dialogRef: MatDialogRef<BannerRequestComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }

  ngOnInit(): void {
  }

  exit(): void {
    this.router.navigate(['/consulta']);
    this.dialogRef.close();
  }

}
