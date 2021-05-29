import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-banner-osiptel',
  templateUrl: './banner-osiptel.component.html',
  styleUrls: ['./banner-osiptel.component.scss']
})
export class BannerOsiptelComponent implements OnInit {
  @Output() clickAction = new EventEmitter<void>();

  info: any;

  constructor(
    public dialogRef: MatDialogRef<BannerOsiptelComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data;
  }


  ngOnInit(): void {

  }

  update(): void {
    this.dialogRef.close();
  }

  continue() {
    this.clickAction.next(this.info.stepper.next());
    this.dialogRef.close();
  }

}
