import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { AppValidators } from '@everis-afp-prima/data';
import { ProcedurePresenter } from './procedure.presenter';
import { HttpProcedureDetails } from '@backoffice/commons/services/procedure-details.service';
import { HttpProcedureCommunication } from '@backoffice/commons/services/communication-send.service';
import { HttpStatus } from '../../commons/services/status.service';
import { HttpFileDownload } from '../../commons/services/download.service';
import { ProcedureModel } from '@backoffice/commons/models/prcedure.model';
import { ModalManager } from '@backoffice/commons/modal-manager/modal-manager';
import { PROCEDURE_TYPE, downloadBlob } from '@everis-afp-prima/data';
import { HttpInternalCommunication } from '../../commons/services/internalComment.service';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'everis-afp-prima-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss'],
  providers: [ProcedurePresenter],
})
export class ProcedureComponent implements OnInit, OnDestroy {
  form: FormGroup;
  statusForm: FormGroup;
  notesForm: FormGroup;
  checked = true;
  loader = false;
  commentSent = false;
  labelFileUpdate = 'Adjuntar Documento';
  formData: FormData = new FormData();
  status = [] as ProcedureModel.Status[];
  details = {} as ProcedureModel.Procedure;
  comments = [] as ProcedureModel.Comment[];
  petitioner = {} as ProcedureModel.Petitioner;
  affiliate = {} as ProcedureModel.Affiliate;
  displayedColumns = [
    'name',
    'relationship',
    'documentNumber',
    'birthdate',
    'sex',
    'condition',
  ];
  beneficiaries = [];
  documentDisplay = ['date', 'document', 'downloadIcon'];
  documentList = [];
  beneficiaryDocumentList = [];

  dropdownStatus = PROCEDURE_TYPE.slice(1, 5);

  dropdownReason = [];
  observed = [
    { value: '32', viewValue: 'Documentos del Trámite observado' },
    { value: '33', viewValue: 'Datos y documentos del Beneficiario observado' },
    {
      value: '34',
      viewValue: 'Datos y documentos del Representante o Apoderado observado',
    },
    { value: '35', viewValue: 'Forma de Pago no válida' },
    { value: '39', viewValue: 'Otros' },
  ];
  rejected = [
    { value: '36', viewValue: 'No cumple con los requisitos del trámite' },
    { value: '37', viewValue: 'Afiliado desiste del trámite' },
    { value: '38', viewValue: 'Comprobante no corresponde para reembolso' },
    { value: '39', viewValue: 'Otros' },
  ];

  uploadMessage = { message: '', error: false };
  fileBase64 = '';
  tempComment = '';
  noteSent = false;
  isUploadReady = true;
  subscription = new Subscription();
  filename = '';
  reason: string;
  constructor(
    public presenter: ProcedurePresenter,
    private detailsService: HttpProcedureDetails,
    private communication: HttpProcedureCommunication,
    private internalNote: HttpInternalCommunication,
    private downloadService: HttpFileDownload,
    private statusService: HttpStatus,
    private router: Router,
    private modal: ModalManager,
    private formBuilder: FormBuilder
  ) {
    this.loader = true;
    this.detailsService
      .getProcedure(this.presenter.setProcedureDetailRQ())
      .subscribe(
        (response: ProcedureModel.Procedure) => {
          const statues = response.statuses;
          this.details = response;
          this.comments = response.comments;
          this.status = this.orderById(response.statuses);
          this.beneficiaries = response.beneficiaries;
          this.beneficiaryDocumentList = response.requirementsBeneficiary;
          this.documentList = response.requirementsRequest;
          this.petitioner = response.petitioner;
          this.affiliate = response.affiliate;
          this.reason = statues[statues.length - 1].reason;
          this.loader = false;
        },
        (err) => {
          this.modal.show('reject');
          this.router.navigate(['tramites']);
          this.loader = false;
        }
      );
  }

  get f() {
    return this.form.controls;
  }
  get d() {
    return this.f.documents as FormArray;
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      reply: new FormControl(null, [AppValidators.required]),
      commentType: new FormControl(false, []),
      documents: new FormArray([]),
    });
    this.statusForm = new FormGroup({
      status: new FormControl(null, []),
      reason: new FormControl(null, []),
    });
    this.notesForm = new FormGroup({
      notes: new FormControl(this.details.commentInternal, []),
    });

    this.statusListener();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private statusListener() {
    const { status, reason } = this.statusForm.controls;
    this.subscription.add(
      status.valueChanges.subscribe((value) => {
        if (value && value === '4') {
          this.enableControl(reason);
          this.dropdownReason = this.observed;
        } else if (value === '5') {
          this.enableControl(reason);
          this.dropdownReason = this.rejected;
        } else {
          this.disableControl(reason);
          this.dropdownReason = [];
        }
      })
    );
  }

  private enableControl(control: AbstractControl) {
    control.enable();
    control.setValue('');
    control.updateValueAndValidity();
  }

  private disableControl(control: AbstractControl) {
    control.setValue('');
    control.disable();
    control.updateValueAndValidity();
  }

  addComment() {
    const comment = this.form.controls.reply.value;
    if (this.form.valid && comment) {
      this.communication
        .sendMessage(
          this.presenter.setCommunicationRQ(
            comment,
            this.fileBase64,
            this.filename
          )
        )
        .subscribe(
          () => {
            this.commentSent = true;
            this.updateLocalComment();
          },
          (err) => {
            console.error('ha ocurrido un error', err);
          }
        );
      this.tempComment = comment;
      this.form.controls.reply.setValue('');
    }
  }

  updateLocalComment() {
    const reply = this.tempComment;
    const registerDate = new Date().toLocaleDateString('es-PE');
    const {
      firstName,
      secondName,
      fatherLastname,
      motherLastname,
    } = JSON.parse(sessionStorage.getItem('currentUser'));
    const affiliate = `${firstName} ${
      secondName ? secondName : ''
    } ${fatherLastname} ${motherLastname}`.toUpperCase();
    const newComment: ProcedureModel.Comment = {
      comment: reply,
      registerDate,
      affiliate,
      functionary: null,
      file: '',
      fileName: this.filename,
    };

    this.comments.splice(0, 0, newComment);
  }

  updateLocalStatus() {
    const statusId = this.statusForm.controls.status.value;
    const findById = (item) => item.value === statusId;
    const temStatus = this.dropdownStatus.find(findById);
    this.details.status = temStatus.name;
  }

  changeStatus() {
    const { statusForm, presenter } = this;
    if (statusForm.valid) {
      const request = presenter.setChangeStatusRQ(statusForm.value);

      this.statusService.changeStatus(request).subscribe(
        () => {
          this.updateLocalStatus();
        },
        (err) => {}
      );
    }
  }

  orderById(arr: any) {
    return arr.sort((a, z) => a.id - z.id);
  }

  back() {
    this.router.navigate(['/tramites']);
  }

  changeUpload(file: File) {
    this.filename = file.name;
    const reader = new FileReader();
    this.fileBase64 = '';
    reader.readAsDataURL(file);
    this.uploadMessage = { message: '', error: false };
    reader.onload = () => {
      this.fileBase64 = reader.result.toString();
    };
  }

  clearUpload() {
    this.fileBase64 = '';
  }

  addDocument(file: any) {
    this.d.push(
      this.formBuilder.group({ file: file.nativeElement.files[0]?.name })
    );
  }

  downloadFile(urlFile: string, realName) {
    const { login } = JSON.parse(sessionStorage.getItem('currentUser'));
    const request = { urlFile, login, nameFile: realName };
    this.downloadService.getFile(request).subscribe((response) => {
      downloadBlob(response, realName);
    });
  }

  sendInternal() {
    const { notes: comment } = this.notesForm.value;
    const { login, id: executiveId } = JSON.parse(
      sessionStorage.getItem('currentUser')
    );
    const { id: requestId } = this.details;
    const request = { comment, login, requestId, executiveId };
    this.internalNote.sendMessage(request).subscribe(
      (res) => {
        this.noteSent = true;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  get isAuthorized() {
    const { id } = JSON.parse(sessionStorage.getItem('currentUser'));
    const { executiveId } = this.details;
    return executiveId === id ? true : false;
  }

  get isActive() {
    const completed = ['Aceptado', 'Rechazado'];
    return !completed.includes(this.details.status);
  }

  messageOutput(message) {
    this.uploadMessage.message = message;
    this.uploadMessage.error = true;
  }
}
