import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { RequestState } from '@affiliates/commons/state/request.state';

import {
  AppValidators,
  IFlow,
  ProcedureModel,
  downloadBlob,
} from '@everis-afp-prima/data';
import { ProcedurePresenter } from './procedure.presenter';
import { HttpProcedureCommunication } from '../../commons/http/communication-send.service';
import { HttpFileDownload } from '../../commons/http/download.service';

@Component({
  selector: 'everis-afp-prima-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss'],
  providers: [ProcedurePresenter],
})
export class ProcedureComponent implements OnInit {
  state$ = this.requestState.request;
  form: FormGroup;
  procedure: any;
  affiliate: any;
  petitioner: any;
  signature: string;
  labelFileUpdate = 'Adjuntar Documento';
  formData: FormData = new FormData();
  currentStatus: string;
  commentSent = false;
  isLoading = false;
  status = [] as ProcedureModel.IStatus[];
  details = {} as ProcedureModel.IProcedure;
  comments = [] as ProcedureModel.IComment[];
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
  uploadMessage = { message: '', error: false };
  fileBase64 = '';
  isUploadReady = true;
  filename = '';
  tempComment = '';
  reason: string;
  constructor(
    private requestState: RequestState,
    public presenter: ProcedurePresenter,
    private router: Router,
    private commentService: HttpProcedureCommunication,
    private downloadService: HttpFileDownload,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      reply: new FormControl(null, [AppValidators.required]),
    });
    this.isLoading = true;
    this.state$.subscribe((state: IFlow) => {
      const statues = state.procedure.statuses;

      this.procedure = state?.procedure;
      this.status = this.orderById(state.procedure.statuses);
      this.currentStatus = state.procedure.status;
      this.details = state.procedure;
      this.comments = state.procedure.comments;
      this.affiliate = state.procedure.affiliate;
      this.beneficiaries = state.procedure.beneficiaries;
      this.affiliate.fullname = this.setFullName(this.affiliate);
      this.documentList = state.procedure.requirementsRequest;
      this.beneficiaryDocumentList = state.procedure.requirementsBeneficiary;
      this.petitioner = state.procedure.petitioner;
      this.reason = statues[statues.length - 1].reason;
      this.signature = state.signature;
      this.isLoading = false;
    });
  }

  get f() {
    return this.form.controls;
  }
  get d() {
    return this.f.documents as FormArray;
  }

  back() {
    this.router.navigate(['/validacion']);
  }

  addComment() {
    const comment = this.form.controls.reply.value;
    if (this.form.valid && comment) {
      this.commentService
        .sendMessage(
          this.presenter.setComentRQ(comment, this.fileBase64, this.filename)
        )
        .subscribe(() => {
          this.commentSent = true;
          this.updateLocalComment();
        });
      this.tempComment = comment;
      this.form.controls.reply.setValue('');
    }
  }

  orderById(arr: any) {
    return arr.sort((a, z) => a.id - z.id);
  }

  setFullName({ firstName, secondName, fatherLastname, motherLastname }) {
    return `${fatherLastname} ${motherLastname} ${firstName} ${secondName}`;
  }

  changeUpload(file: File) {
    this.filename = file.name;
    const reader = new FileReader();
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

  downloadFile(
    urlFile: string,
    documentNumber: string,
    documentType: number,
    birthdate: string,
    nameFile: string
  ) {
    const request = {
      urlFile,
      documentNumber,
      documentType,
      birthdate,
      nameFile,
    };
    this.downloadService
      .getFile(request, this.signature)
      .subscribe((response) => {
        downloadBlob(response, nameFile);
      });
  }

  messageOutput(message) {
    this.uploadMessage.message = message;
    this.uploadMessage.error = true;
  }

  updateLocalComment() {
    const reply = this.tempComment;
    const registerDate = new Date().toLocaleDateString('es-PE');
    const {
      firstName,
      secondName,
      fatherLastname,
      motherLastname,
    } = this.affiliate;
    const affiliate = `${firstName} ${
      secondName ? secondName : ''
    } ${fatherLastname} ${motherLastname}`.toUpperCase();
    const newComment: ProcedureModel.IComment = {
      comment: reply,
      registerDate,
      affiliate,
      functionary: null,
      file: '',
      fileName: this.filename,
    };

    this.comments.splice(0, 0, newComment);
  }
  get isActive (){
    const completed = ['Aceptado', 'Rechazado'];
    
    return !completed.includes(this.currentStatus);
  }

}
