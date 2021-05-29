import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'everis-afp-prima-modal-usernotfound',
  templateUrl: './modal-usernotfound.component.html',
  styleUrls: ['./modal-usernotfound.component.scss']
})
export class ModalUserNotFoundComponent implements OnInit {

  info;

  constructor(
    public dialogRef: MatDialogRef<ModalUserNotFoundComponent>,
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
