import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-banner-confirm-libre-disponibilidad',
  templateUrl: './banner-confirm-libre-disponibilidad.component.html',
  styleUrls: ['./banner-confirm-libre-disponibilidad.component.scss']
})
export class BannerConfirmLibreDisponibilidadComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BannerConfirmLibreDisponibilidadComponent>) { }

  ngOnInit(): void {
  }

  back(): void {
    this.dialogRef.close();
  }

}
