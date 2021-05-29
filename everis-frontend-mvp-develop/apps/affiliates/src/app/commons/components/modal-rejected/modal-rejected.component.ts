import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ModalManager } from '@affiliates/commons/modal-manager/modal-manager';

@Component({
  selector: 'everis-afp-prima-modal-rejected',
  templateUrl: './modal-rejected.component.html',
  styleUrls: ['./modal-rejected.component.scss']
})
export class ModalRejectedComponent implements OnInit {

  info;
  typeError = true;
  constructor(
    public dialogRef: MatDialogRef<ModalRejectedComponent>,
    // private modal: ModalManager,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }

  ngOnInit(): void {
    (this.info.error.code === 'PRI0022') ? this.typeError = false : null;
  }

  exit(): void {
    this.dialogRef.close();
  }
}
