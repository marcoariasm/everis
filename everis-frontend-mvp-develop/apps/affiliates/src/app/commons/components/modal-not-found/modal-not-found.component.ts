import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'everis-afp-prima-modal-not-found',
  templateUrl: './modal-not-foun.component.html',
  styleUrls: ['./modal-not-found.component.scss'],
})
export class ModalNotFoundComponent implements OnInit {
  urlRedirect;

  constructor(
    public dialogRef: MatDialogRef<ModalNotFoundComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.urlRedirect = this.data;
  }
  ngOnInit(): void {}
  exit(): void {
    this.dialogRef.close();
  }
  redirectSbs() {
    window.open(
      'https://www2.sbs.gob.pe/afiliados/paginas/Consulta.aspx',
      '_blank'
    );
  }
}
