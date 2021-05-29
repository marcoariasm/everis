import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalRejectedComponent } from '../components/modal-rejected/modal-rejected.component';
import { ModalAssignedComponent } from '../components/modal-assigned/modal-assigned.component';
import { ModalUserNotFoundComponent } from '../components/modal-usernotfound/modal-usernotfound.component';
import { ModalSessionComponent } from '../components/modal-session/modal-session.component';
import { ModalProcedureCodeComponent } from '../components/modal-procedure-code/modal-procedure-code.component';
import { ModalReassignedComponent } from '../components/modal-reasigned/modal-reassigned.component';

export type TypeBanner =
  | 'assign'
  | 'reject'
  | 'usernotfound'
  | 'session'
  | 'reassigned'
  | 'procedureCode';
@Injectable({
  providedIn: 'root',
})
export class ModalManager {
  private bodyComponents: any = {
    assign: ModalAssignedComponent,
    reject: ModalRejectedComponent,
    usernotfound: ModalUserNotFoundComponent,
    session: ModalSessionComponent,
    procedureCode: ModalProcedureCodeComponent,
    reassigned: ModalReassignedComponent,
  };

  private modalConfig: MatDialogConfig = {
    width: '350px',
    data: {
      reset: true,
    },
  };
  constructor(private dialog: MatDialog) {}

  show<T>(type: TypeBanner, data?: MatDialogConfig) {
    return this.dialog.open(this.bodyComponents[type], {
      ...this.modalConfig,
      disableClose: true,
      ...data,
    });
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
