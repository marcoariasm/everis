import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'everis-afp-prima-modal-rejected',
  templateUrl: './modal-procedure-code.component.html',
  styleUrls: ['./modal-procedure-code.component.scss']
})
export class ModalProcedureCodeComponent implements OnInit {

  info;

  constructor(
    public dialogRef: MatDialogRef<ModalProcedureCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }

  ngOnInit(): void {
  }

  exit(): void {
    this.dialogRef.close();
  }
}
