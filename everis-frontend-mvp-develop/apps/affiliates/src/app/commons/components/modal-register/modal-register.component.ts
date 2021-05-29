import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestState } from '@affiliates/commons/state/request.state';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'everis-afp-prima-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss'],
})
export class ModalRegisterComponent implements OnInit, OnDestroy {
  info;
  state$ = this.requestState;
  stateSubscription = new Subscription();
  constructor(
    private requestState: RequestState,
    private router: Router,
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = this.data;
  }

  ngOnInit(): void {
    if (!this.info.dataRequest.petitioner) {
      this.stateSubscription = this.state$.request.subscribe((data) => {
        if (Object.values(data).length != 0) {
          this.info.email = data.affiliate.email;
          this.info.movil = data.affiliate.cellphone;
          this.info.telefono = data.affiliate.telephone;
        }
      });
    } else {
      this.info.email = this.info.dataRequest.petitioner.email;
      this.info.movil = this.info.dataRequest.petitioner.cellphone;
      this.info.telefono = this.info.dataRequest.petitioner.telephone;
    }
  }

  exit(): void {
    this.state$.reset();

    this.dialogRef.close();
    this.router.navigate(['/tipo-de-tramite']);
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
