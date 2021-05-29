import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'everis-afp-prima-modal-rejected',
  templateUrl: './modal-assigned.component.html',
  styleUrls: ['./modal-assigned.component.scss']
})
export class ModalAssignedComponent implements OnInit {

  info;

  constructor(
    public dialogRef: MatDialogRef<ModalAssignedComponent>,
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
