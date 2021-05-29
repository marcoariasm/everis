import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'everis-afp-prima-modal-rejected',
  templateUrl: './modal-rejected.component.html',
  styleUrls: ['./modal-rejected.component.scss']
})
export class ModalRejectedComponent implements OnInit {

  info;

  constructor(
    public dialogRef: MatDialogRef<ModalRejectedComponent>,
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
