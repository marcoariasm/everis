import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { RequestState } from '@affiliates/commons/state/request.state';
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
  AppValidators,
  EProcedureValidType,
  IFlow,
  MESSAGES,
  FULLPROCEDURES,
  DOCUMENT_TYPE,
  RELATION_TYPE_BENIFICIARY,
  RELATION_TYPE_BENIFICIARY_M,
  RELATION_TYPE_BENIFICIARY_F,
  RELATION_TYPE_REQUEST,
  DOCUMENTS,
} from '@everis-afp-prima/data';
import { RegisterPresenter } from './register.presenter';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { HttpFileUploadService } from '../../commons/http/upload.service';
import { CommonService } from '../../commons/http/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'everis-afp-prima-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    RegisterPresenter,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  state$ = this.requestState.request;
  subscriptions = new Subscription();
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  procedures: any[];
  documents: any[];
  isAffiliate: boolean;
  formData: FormData = new FormData();
  signature: string;
  affiliate: any;
  messageGeneral: string;
  labelFileUpdate = 'Subir archivo';
  filterControl = new FormControl();
  documentTypeOptions = DOCUMENT_TYPE;
  relationTypeRequest = RELATION_TYPE_REQUEST;
  relationTypeBenificary = [];
  fileBase64;
  uploadMessage = { message: '', error: false };
  uploadMessageBeneficiary = { message: '', error: false };
  loadUploadFile = true;
  loadUploadFileBeneficiary = true;
  filesUpload = [];
  filesUplaodBeneficiary = [];
  formatAllow = ['pdf', 'png', 'jpg', 'jpeg','image/jpeg','application/pdf','image/png','image/jpg'];
  maxSizeFile = 8;
  fileName = '';
  fileNameBeneficiary = '';
  messageBeneficiary = '';
  NotBenificiary = false;
  onlyLetters = 'isOnlyLettersWithSpace';
  onlyNumeric = 'isOnlyNumeric';
  alphaNumeric = 'isAlphaNumeric';
  private procedureTypeSubscriptionRef = new Subscription();

  constructor(
    private requestState: RequestState,
    public presenter: RegisterPresenter,
    private formBuilder: FormBuilder,
    private fileUploadService: HttpFileUploadService,
    private comon: CommonService
  ) {}

  ngOnInit(): void {
    this.messageBeneficiary = Object.values(MESSAGES).find(
      (m) => m.key === 'BENEFICIARY_DOCUMENTS_LEGEND'
    ).value;

    this.form = new FormGroup({
      procedureType: new FormControl('', [AppValidators.required]),
      fatherLastname: new FormControl(''),
      motherLastname: new FormControl(''),
      firstName: new FormControl(''),
      secondName: new FormControl(''),
      documentType: new FormControl(''),
      documentNumber: new FormControl(''),
      contactEmail: new FormControl(''),
      birthdate: new FormControl(''),
      phoneNumber: new FormControl(''),
      genero: new FormControl(''),
      contactPhoneNumber: new FormControl('', [Validators.maxLength(11)]),
      contactCellPhoneNumber: new FormControl(''),
      applicant: new FormArray([]),
      beneficiaries: new FormArray([]),
      documents: new FormArray([]),
      comments: new FormControl(''),
      contactToggle: new FormControl(''),
      verifyBeneficiary: new FormControl(''),
    });
    this.form.controls.procedureType.setValue('');

    this.setRangeDate();
    this.subscriptions.add(
      this.state$.subscribe((state: IFlow) => {
        this.signature = state.signature;
        this.isAffiliate = state.isAffiliate;
        this.affiliate = state.affiliate;

        this.comon
          .getTypeRequest(
            {
              documentType: parseInt(this.affiliate.documentTypeId),
              documentNumber: this.affiliate.documentNumber,
              birthdate: this.affiliate.birthdate,
            },
            this.signature
          )
          .subscribe((data) => {
            this.procedures = this.getProcedures(data);
            this.setMessageTooltip();
          });

        if (state.affiliate) {
          const {
            firstName = '',
            secondName = '',
            fatherLastname = '',
            motherLastname = '',
            documentNumber = '',
            email = '',
            cellphone = '',
            birthdate = '',
            telephone = '',
            documentType = '',
            genre = '',
          } = state.affiliate;

          this.form.controls.fatherLastname.setValue(fatherLastname);
          this.form.controls.motherLastname.setValue(motherLastname);
          this.form.controls.firstName.setValue(firstName);
          this.form.controls.secondName.setValue(secondName);
          this.form.controls.documentType.setValue(documentType);
          this.form.controls.documentNumber.setValue(documentNumber);
          this.form.controls.contactEmail.setValue(email);
          this.form.controls.contactCellPhoneNumber.setValue(cellphone);
          this.form.controls.contactPhoneNumber.setValue(telephone);
          this.form.controls.birthdate.setValue(birthdate);
          this.form.controls.genero.setValue(genre);
        }

        if (!this.isAffiliate) {
          this.addApplicant();
        
        }
      })
    );

    this.subscriptions.add(
      this.form.controls.verifyBeneficiary.valueChanges.subscribe((checked) => {
        checked
          ? this.form.controls.beneficiaries.disable()
          : this.form.controls.beneficiaries.enable();
        this.NotBenificiary = checked;
      })
    );

    
  }

  ngOnDestroy() {
    this.procedureTypeSubscriptionRef.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  private setMessageTooltip() {
    this.procedureTypeSubscriptionRef = this.form.controls[
      'procedureType'
    ].valueChanges.subscribe((value: number) => {
      this.messageGeneral = this.procedures
        .find((procedure) => procedure.value === value)
        .documents.map((document) => document.name)
        .join('<br><br>');
    });
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.form.controls;
  }
  get b() {
    return this.f.beneficiaries as FormArray;
  }
  get a() {
    return this.f.applicant as FormArray;
  }
  get d() {
    return this.f.documents as FormArray;
  }

  errorForm(field: string, type: string) {
    return this.form.get(field).hasError(type);
  }

  changeToogle(checked) {
    if (checked) {
      this.form.controls.contactEmail.setValue('');
      this.form.controls.contactPhoneNumber.setValue('');
      this.form.controls.contactCellPhoneNumber.setValue('');
      this.form.controls.contactEmail.enable();
      this.form.controls.contactPhoneNumber.enable();
      this.form.controls.contactCellPhoneNumber.enable();
      this.form
        .get('contactEmail')
        .setValidators([AppValidators.required, AppValidators.email]);
      this.form
        .get('contactCellPhoneNumber')
        .setValidators([AppValidators.required]);
      this.form
        .get('contactPhoneNumber')
        .setValidators([AppValidators.required, AppValidators.minLength(7)]);
    } else {
      this.form.controls.contactEmail.setValue(this.affiliate.email);
      this.form.controls.contactPhoneNumber.setValue(this.affiliate.telephone);
      this.form.controls.contactCellPhoneNumber.setValue(
        this.affiliate.cellphone
      );
      this.form.controls.contactEmail.disable();
      this.form.controls.contactPhoneNumber.disable();
      this.form.controls.contactCellPhoneNumber.disable();
    }
  }

  orderByname(a: any, z: any) {
    const nameA = a.name.toUpperCase();
    const nameZ = z.name.toUpperCase();
    let compare = 0;
    if (nameA > nameZ) {
      compare = 1;
    } else {
      compare = -1;
    }
    return compare;
  }
  selectProcedure(value: string) {
    this.d.clear();
  }

  addBeneficiary() {
    this.relationTypeBenificary.push(RELATION_TYPE_BENIFICIARY);
    this.b.push(
      this.formBuilder.group({
        firstName: new FormControl('', [AppValidators.required]),
        secondName: new FormControl(''),
        motherLastName: new FormControl(''),
        fatherLastName: new FormControl(''),
        documentType: new FormControl('', [AppValidators.required]),
        documentNumber: new FormControl('', [AppValidators.required]),
        birthdate: new FormControl(''),
        gender: new FormControl(''),
        relationship: new FormControl(''),
        condition: new FormControl(''),
        documents: new FormControl(''),
      })
    );
  }

  genderSelectionChange(value, i) {
    if (value === 'M') {
      this.relationTypeBenificary[i] = RELATION_TYPE_BENIFICIARY_M;
    } else {
      this.relationTypeBenificary[i] = RELATION_TYPE_BENIFICIARY_F;
    }
  }

  addApplicant() {
    this.a.push(
      this.formBuilder.group({
        fatherLastName: new FormControl('', [AppValidators.required]),
        motherLastName: new FormControl('', [AppValidators.required]),
        documentType: new FormControl('', [AppValidators.required]),
        documentNumber: new FormControl('', 
        [AppValidators.required] ),
        relationship: new FormControl('',[AppValidators.required]),
        firstName: new FormControl('',[AppValidators.required]),
        secondName: new FormControl(''),
        email: new FormControl('',[AppValidators.required,AppValidators.email]),
        birthdate: new FormControl('',[AppValidators.required]),
        gender: new FormControl('',[AppValidators.required]),
        phoneNumber: new FormControl('', [AppValidators.required,Validators.maxLength(9)]),
        cellPhoneNumber: new FormControl('', [AppValidators.required,Validators.maxLength(11)]),
      })
    );
  }

  addDocument(file: any) {
    this.d.push(this.formBuilder.group({ file }));
  }

  deleteBeneficiary(idx: number) {
    this.b.removeAt(idx);
    this.relationTypeBenificary.splice(idx, 1);
  }

  changeUpload(file: File) {
    this.fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.uploadMessage = { message: '', error: false };
    reader.onload = () => {
      this.fileBase64 = reader.result.toString();
      this.uploadFile();
    };
  }

  changeUploadBeneficiary(file: File) {
    this.fileNameBeneficiary = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.uploadMessageBeneficiary = { message: '', error: false };
    reader.onload = () => {
      this.fileBase64 = reader.result.toString();
      this.uploadFileBeneficiary();
    };
  }

  uploadFile() {
    this.loadUploadFile = false;

    this.subscriptions.add(
      this.fileUploadService
        .sendFile(this.fileRQ(), this.affiliate.signature)
        .subscribe(
          (response) => {
            this.loadUploadFile = true;
            this.uploadMessage = this.uploadCorrect();
            const uploadObject = { ...response, uploadName: this.fileName };

            this.filesUpload.push(uploadObject);
          },
          (err) => {
            this.uploadMessage = this.uploadError();
            this.loadUploadFile = true;
          }
        )
    );
  }

  uploadFileBeneficiary() {
    this.loadUploadFileBeneficiary = false;

    this.subscriptions.add(
      this.fileUploadService
        .sendFile(this.fileBQ(), this.affiliate.signature)
        .subscribe(
          (response) => {
            this.loadUploadFileBeneficiary = true;
            this.uploadMessageBeneficiary = this.uploadCorrect();
            const uploadObject = {
              ...response,
              uploadName: this.fileNameBeneficiary,
            };
            this.filesUplaodBeneficiary.push(uploadObject);
          },
          (err) => {
            this.uploadMessageBeneficiary = this.uploadError();
            this.loadUploadFileBeneficiary = true;
          }
        )
    );
  }

  uploadCorrect() {
    return { message: 'Archivo cargado satisfactoriamente', error: false };
  }

  uploadError() {
    return {
      message: 'Ha ocurrido un error al cargar su archivo',
      error: true,
    };
  }

  clearUpload(idx: number) {
    this.d.removeAt(idx);
  }

  register() {
    if (this.form.controls.contactToggle.value) {
      this.affiliate.email = this.form.value.contactEmail;
      this.affiliate.cellphone = this.form.value.contactCellPhoneNumber.substr(
        0,
        11
      );
      this.affiliate.telephone = this.form.value.contactPhoneNumber.substr(
        0,
        9
      )
     
    }

    const signature = this.signature;
    const formData = this.formData;
    const values = this.form.value;
    const affiliate = this.affiliate;
    const data = this.prepareData(values, formData, affiliate);
    console.log(data);
    this.presenter.register(data, signature);
  }

  private setRangeDate() {
    const range = 130;
    const start = 0;
    const currentDate = moment().subtract(start, 'y').format('YYYY-MM-DD');
    const currentDateArr = currentDate.split('-');
    const currentYear = parseInt(currentDateArr[0], 10);
    const currentMonth = parseInt(currentDateArr[1], 10) - 1;
    const currentDay = parseInt(currentDateArr[2], 10);

    this.minDate = new Date(currentYear - range, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
  }

  private prepareData(values, formData, affiliate) {
    const { procedureType, applicant, comments, beneficiaries } = values;
    const {
      id,
      documentTypeId,
      documentNumber,
      birthdate,
      email,
      telephone,
      cellphone,
    } = affiliate;


    return {
      requestType: procedureType,
      comment: comments,
      affiliate: {
        id,
        documentType: documentTypeId,
        documentNumber,
        birthdate: birthdate,
        email: this.form.controls.contactToggle.value ? email : '',
        cellphone: this.form.controls.contactToggle.value
          ? cellphone
          : '',
        telephone: this.form.controls.contactToggle.value
          ? telephone
          : '',
      },
      petitioner: this.getApplicant(applicant),
      beneficiaries: this.NotBenificiary
        ? []
        : this.getBeneficiaries(beneficiaries),
      requirementsRequest: this.handlerFile(this.filesUpload),
      requirementsBeneficiary: this.handlerFile(this.filesUplaodBeneficiary),
    };
  }
  handlerFile(uploadFile) {
    const requestFile = uploadFile.map((e) => {
      return {
        requirementId: e.uploadId,
        requirementFile: e.uploadUrl,
      };
    });
    return requestFile;
  }

  getBeneficiaries(beneficiaries) {
    const formBeneficiaries = [];

    beneficiaries.forEach((person) => {
      formBeneficiaries.push({
        documentType: person.documentType,
        documentNumber: person.documentNumber,
        firstName: person.firstName,
        secondName: person.secondName,
        fatherLastname: person.fatherLastName,
        motherLastname: person.motherLastName,
        relationshipType: person.relationship,
        conditionType: person.condition,
        birthdate: person.birthdate ? this.handlerDate(person.birthdate) : '',
        genre: person.gender,
      });
    });

    return formBeneficiaries;
  }
  getApplicant(applicant) {
    if (applicant[0]) {
      return {
        documentType: applicant[0].documentType,
        documentNumber: applicant[0].documentNumber,
        firstName: applicant[0].firstName,
        secondName: applicant[0].secondName,
        fatherLastname: applicant[0].fatherLastName,
        motherLastname: applicant[0].motherLastName,
        relationshipType: applicant[0].relationship,
        birthdate: applicant[0].birthdate
          ? this.handlerDate(applicant[0].birthdate)
          : null,
        genre: applicant[0].gender,
        cellphone: applicant[0].cellPhoneNumber,
        email: applicant[0].email,
        telephone: applicant[0].phoneNumber,
      };
    } else {
      return null;
    }
  }

  fileRQ() {
    const { documentTypeId, documentNumber, birthdate } = this.affiliate;
    return {
      documentType: documentTypeId,
      documentNumber,
      birthdate,
      uploadType: 'R',
      uploadFile: this.fileBase64,
      uploadName: this.fileName,
    };
  }
  fileBQ() {
    const { documentTypeId, documentNumber, birthdate } = this.affiliate;
    return {
      documentType: documentTypeId,
      documentNumber,
      birthdate,
      uploadType: 'B',
      uploadFile: this.fileBase64,
      uploadName: this.fileNameBeneficiary,
    };
  }

  enableBeneficiary(typeSelected: string): boolean {
    if (typeSelected) {
      const validTypes = this.procedures.filter((element) => {
        return element.value === typeSelected;
      });
      const isValid = validTypes[0].beneficiaries === '1' ? true : false;
      if (!isValid) this.resetAllBeneficiary(this.b);
      return isValid;
    }
  }
  messageOutput(message) {
    this.uploadMessage.message = message;
    this.uploadMessage.error = true;
  }
  clearFile(index) {
    this.filesUpload.splice(index, 1);
    this.uploadMessage = { message: '', error: false };
  }

  clearFileBeneficiaryindex(index) {
    this.filesUplaodBeneficiary.splice(index, 1);
    this.uploadMessage = { message: '', error: false };
  }

  private getProcedures(data) {
    return data.map((elemento) => {
      return {
        value: elemento.id,
        name: elemento.name,
        beneficiaries: elemento.inBeneficiary,
        documents: elemento.requirements,
      };
    });
  }

  private resetAllBeneficiary(formArray: FormArray) {
    this.relationTypeBenificary = [];
    this.clearFormArray(formArray);
  }

  private clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };
  private handlerDate(date) {
    const [day, month, year] = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    ];
    return `${day}/${month}/${year}`;
  }
}
