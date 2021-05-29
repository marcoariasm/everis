import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalManager } from '@backoffice/commons/modal-manager/modal-manager';
import { HttpAssignmentService } from '@backoffice/commons/services/assignment.service';
import { ExecutiveService } from '@backoffice/commons/services/executive.service';
import { ListProceduresPresenter } from '../../../features/list-procedures/list-procedures.presenter';

@Component({
  selector: 'everis-afp-prima-modal-reassigned',
  templateUrl: './modal-reassigned.component.html',
  styleUrls: ['./modal-reassigned.component.scss'],
})
export class ModalReassignedComponent implements OnInit {
  info;
  listUser;
  form: FormGroup;
  errorAssigned = false;

  private user = JSON.parse(sessionStorage.getItem('currentUser'));

  constructor(
    public dialogRef: MatDialogRef<ModalReassignedComponent>,
    private executive: ExecutiveService,
    private assignment: HttpAssignmentService,
    private modal: ModalManager,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.info = data.id;
    this.form = new FormGroup({
      matricula: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.executive
      .listExecutive({
        login: this.user.login,
      })
      .subscribe((data) => {
        this.listUser = data;
      });
  }

  reassigned() {
    const executiveId = this.form.value.matricula;
    const values = this.prepareData(this.info, executiveId);
    this.assignment.assign(values).subscribe(
      () => {
        this.exit();
        this.modal.show('assign');
      },
      () => {
        this.errorAssigned = true;
        this.form.controls.matricula.reset();
      }
    );
  }

  exit(): void {
    this.dialogRef.close();
  }

  prepareData(requestId, executiveId) {
    return {
      login: this.user.login,
      requestId: requestId,
      executiveId: executiveId,
    };
  }
}
