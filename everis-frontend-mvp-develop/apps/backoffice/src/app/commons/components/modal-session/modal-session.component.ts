import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestState } from '@backoffice/commons/state/request.state';

@Component({
  templateUrl: './modal-session.component.html',
  styleUrls: ['./modal-session.component.scss'],
})
export class ModalSessionComponent {
  info;

  constructor(
    public dialogRef: MatDialogRef<ModalSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private state: RequestState
  ) {
    this.info = data;
  }

  exit(): void {
    sessionStorage.removeItem('currentUser');
    this.state.reset();
    this.dialogRef.close();
  }

  refreshToken(): void {
    // TODO: llamar a la api de refresh token.
    // this.handleRefreshTokenService.init();
    this.dialogRef.close();
  }
}
