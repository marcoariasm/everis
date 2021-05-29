import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {FormGroup, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';
import {UIT} from '@aafp/commons/constants/uit';
import {Ubigeo} from '@aafp/commons/http/ubigeo.http';
import {ResidenteAportePresenter} from 'src/app/views/residente-aporte-step/residente-aporte.presenter';
import {AppValidators} from '@aafp/commons/validators/validators';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UploadFileHelper} from '@aafp/commons/utils/uploadFile.helper';
import {RequestState} from '@aafp/commons/state/request.state';
import {EUbigeoState} from '@aafp/commons/enums';
import {BANKS_056} from '@aafp/commons/constants';
import {MatFileUploadComponent} from 'mat-file-upload';
import {ModalManager} from '@aafp/commons/modal-manager/modal-manager';
import {SessionStorage} from '@ecnf/ng-microkernel/storage';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit, OnDestroy {
  @ViewChild('file') file: MatFileUploadComponent;
  tooltipMessage = 'Adjunta un documento del banco, en español o inglés, con la información de tu cuenta.';
  form: FormGroup;
  stepOne: FormGroup;
  maxlengthPhone = 9;
  public uit = UIT;
  public isApvAmountEqualDisbursement: boolean;
  public isApvAmountLowerDisbursement: boolean;
  public isApvAccept: boolean;
  public isApvEnable: boolean;
  public request$ = this.requestState.request;
  public stateData: any;
  public showBankListWindowPayment = true;

  private unsubscribe: Subject<void>;

  constructor(
    public ubigeo: Ubigeo,
    public presenter: ResidenteAportePresenter,
    public uploadFile: UploadFileHelper,
    private requestState: RequestState,
    private modal: ModalManager,
    private storage: SessionStorage,
  ) {

    this.isApvAccept = false;
    this.isApvAmountEqualDisbursement = false;
    this.isApvAmountLowerDisbursement = false;
    this.isApvEnable = Number(this.storage.get('retentionFlag')) === 1;
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.form = this.presenter.stepTwo;

    this.stepOne = this.presenter.stepOne;
    this.setInitiaFormValues();

    this.readStateData();

    this.ubigeo.getDepartments();
    this.ubigeo.getCountries();
    this.ubigeo.getCurrencies();
    this.ubigeo.getBanks();

    this.initValidations();
    this.subscribeToBankChange();
    this.subscribeToStepOneChanges();
    this.requestState.request
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        if (value.filename !== '') {
          this.formNoResidePeru().get('documentoVoucher').setValue(value.filename);
        }
      });
  }

  setInitiaFormValues() {
    this.form.controls['residencia'].setValue('RESIDE_IN_PERU');
    this.form.controls['pais'].setValue('PE');
    this.form.controls['accountStatusFlag'].setValue(true),
      this.form.controls['personalDataCheck'].setValue(true),
      this.formResidePeru().get('tipoRetiro').setValue('BANK_DEPOSIT');
  }

  ngOnDestroy(): void {

    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  departmentsChange(value) {
    const res = this.ubigeo.departments.filter(item => {
      return item.code === value;
    })[0].description;
    this.presenter.codeDescripcion.departamento = res;
  }

  provincesChange(value) {
    const res = this.ubigeo.provinces.filter(item => {
      return item.code === value;
    })[0].description;
    this.presenter.codeDescripcion.provincia = res;
  }

  districtsChange(value) {
    const res = this.ubigeo.districts.filter(item => {
      return item.code === value;
    })[0].description;
    this.presenter.codeDescripcion.distrito = res;

    if (this.formResidePeru().get('tipoRetiro').value === 'WINDOW_PAYMENT') {

      this.analizeUbigeoAndClient();

    }
  }

  countriesChange(value) {
    const res = this.ubigeo.countries.filter(item => {
      return item.code === value;
    })[0].description;
    this.presenter.codeDescripcion.pais = res;
  }

  countryBankInterChange(value) {
    const res = this.ubigeo.countries.filter(item => {
      return item.code === value;
    })[0].description;
    this.presenter.codeDescripcion.paisBancoIntermediario = res;
  }

  currenciesBankChange(value) {
    const res = this.ubigeo.currencies.filter(item => {
      return item.code === value;
    })[0].description;
    this.presenter.codeDescripcion.monedaBancoDestino = res;
  }

  banksChange(value) {
    const res = this.ubigeo.banks.filter(item => {
      return item.code === value;
    })[0].description;
    this.presenter.codeDescripcion.banco = res;
  }

  async readStateData() {
    let request: any;
    this.request$.subscribe(data => request = data).unsubscribe();
    this.stateData = {...request};
  }

  public hasErrors(key: string) {
    const control = this.form.get(key);
    return control.errors && (control.dirty || control.touched);
  }

  public hasErrorsResidoNoPeru(key: string) {
    const control = this.formNoResidePeru().get(key);
    return control.errors && (control.dirty || control.touched);
  }

  public hasErrorsResidoPeru(key: string) {
    const control = this.formResidePeru().get(key);
    return control.errors && (control.dirty || control.touched);
  }

  get classEECC() {
    const {accountStatusFlag} = this.stateData;
    return accountStatusFlag === '1' ? true : false;
  }

  get apvValue() {
    return this.stepOne.get('radio').value;
  }

  get amountWithdraw() {
    const currentAmountAPV = Number(this.stepOne.get('amountAPV').value);
    const currentAmountWithDraw = Number(this.stepOne.get('amountWithdraw').value);

    return currentAmountAPV ? currentAmountWithDraw - currentAmountAPV : currentAmountWithDraw;
  }

  get amountAvailable() {
    return this.storage.get('amountAvailable') ? Number(this.storage.get('amountAvailable')) : '';
  }

  get amountAPV() {
    return +this.stepOne.get('amountAPV').value;
  }

  get accountMaxLenght() {

    const bankName = this.formResidePeru().get('banco').value;
    if (bankName) {

      switch (bankName) {

        case 'RIPLEY':
          return 11;
        case 'BCP':
          return 14;
        case 'IBK':
          return 13;
        case 'CAJASULLANA':
          return 20;
        case 'BBVA':
        case 'CAJAHUANCAYO':
          return 18;
        case 'SCOTIA':
        case 'BN':
        case 'BANBIF':
          return 10;
        case 'BANCODECOMERCIO':
        case 'PICHINCHA':
        case 'GNB':
          return 12;
      }
    }

    return 20;
  }

  get amountDisbursement() {
    return Number(this.amountAPV) + this.amountWithdraw;
  }

  get residenceIsPeru() {
    return this.form.get('residencia').value === 'RESIDE_IN_PERU';
  }


  get retentionFlag() {
    return Number(this.storage.get('retentionFlag' || ''));
  }

  get districtInGroupOneWithDNI() {
    return sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_IN_GROUP_ONE_WITH_DNI;
  }

  get districtInGroupOneWithoutDNI() {
    return sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_IN_GROUP_ONE_WITHOUT_DNI;
  }

  get districtInGroupTwo() {
    return sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_IN_GROUP_TWO;
  }

  get districtWithoutGroupAfpValid() {
    return sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_WITHOUT_GROUP_AFP_IH;
  }

  get districtWithoutGroupAfpNoValid() {
    return sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_WITHOUT_GROUP_AFP_PP;
  }

  get districtNotSelected() {
    return sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_NOT_SELECTED;
  }

  get banks056() {

    return this.ubigeo.banks.filter((bank) => BANKS_056.find((bank056) => bank056 === bank.code));
  }

  public isApvWithValidConditions() {
    return this.retentionFlag === 1 && this.apvValue === 'SI' && this.amountWithdraw > 0;
  }


  public formResidePeru(): FormGroup {
    return this.form.get('saldoResidoPeru') as FormGroup;
  }

  public formNoResidePeru(): FormGroup {
    return this.form.get('saldoResidoNoPeru') as FormGroup;
  }

  public changeResidence(event: MatRadioChange) {

    if (this.isApvAmountLowerDisbursement || !this.isApvAccept) {

      this.validateFiles1(event.value);
    }

    this.validateFiles2(event.value);
  }

  public changeRetirementType(event: MatRadioChange) {
    const bankControl = this.formResidePeru().get('banco');
    if (event.value === 'BANK_DEPOSIT') {
      bankControl.setValidators([Validators.required]);
      bankControl.enable();
      this.formResidePeru().get('numeroDeCuenta').setValidators([Validators.required, AppValidators.accoounNumber(bankControl)]);

      sessionStorage.removeItem('ubigeoState');
    } else if (event.value === 'WINDOW_PAYMENT') {
      this.analizeUbigeoAndClient();

    }

    setTimeout(() => {

      this.formResidePeru().updateValueAndValidity();
    }, 0);
  }

  private analizeUbigeoAndClient() {

    this.formResidePeru().get('numeroDeCuenta').clearValidators();
    this.formResidePeru().get('numeroDeCuenta').reset();
    this.formResidePeru().get('banco').reset();

    const district = this.form.get('distrito').value;
    if (district) {

      const [ubigeoType] = this.ubigeo.districts.filter((districts) => districts.code === district);
      const {documentType, afp} = this.stateData;
      if (documentType !== 'DNI') {
        sessionStorage.setItem('ubigeoState', EUbigeoState.DISTRICT_IN_GROUP_ONE_WITHOUT_DNI);
        this.showBankListWindowPayment = false;
        return;
      }

      if (ubigeoType) {

        if (ubigeoType.type === 'A') {

          this.formResidePeru().get('banco').disable();
          this.formResidePeru().get('banco').clearValidators();
          this.showBankListWindowPayment = false;
          sessionStorage.setItem('ubigeoState', EUbigeoState.DISTRICT_IN_GROUP_ONE_WITH_DNI);

        } else if (ubigeoType.type === 'B' && (afp === 'INTEGRA' || afp === 'HABITAT' || afp === 'PRIMA')) {

          this.formResidePeru().get('banco').enable();
          this.formResidePeru().get('banco').setValidators([Validators.required]);
          this.showBankListWindowPayment = true;
          sessionStorage.setItem('ubigeoState', EUbigeoState.DISTRICT_IN_GROUP_TWO);

        } else if (ubigeoType.type === '' && (afp === 'INTEGRA' || afp === 'HABITAT')) {
          sessionStorage.setItem('ubigeoState', EUbigeoState.DISTRICT_WITHOUT_GROUP_AFP_IH);
          this.formResidePeru().get('banco').enable();
          this.formResidePeru().get('banco').setValidators([Validators.required]);
          this.showBankListWindowPayment = true;

        } else {
          this.formResidePeru().get('banco').disable();
          this.formResidePeru().get('banco').clearValidators();
          this.showBankListWindowPayment = false;
          sessionStorage.setItem('ubigeoState', EUbigeoState.DISTRICT_WITHOUT_GROUP_AFP_PP);
        }
      }
    } else {

      this.formResidePeru().get('banco').disable();
      this.formResidePeru().get('banco').clearValidators();
      this.showBankListWindowPayment = false;
      sessionStorage.setItem('ubigeoState', EUbigeoState.DISTRICT_NOT_SELECTED);
    }

  }

  public changeIntermediaryBank(event: MatRadioChange) {
    if (event.value === 'INTERMEDIARY_BANK_ACCOUNT') {
      this.formNoResidePeru().get('bancoIntermediario').setValidators([Validators.required]);
      this.formNoResidePeru().get('paisBancoIntermediario').setValidators([Validators.required]);
      this.formNoResidePeru().get('ciudadBancoIntermediario').setValidators([Validators.required]);
      this.formNoResidePeru().get('cuentaBancoIntermediario').setValidators([Validators.required, AppValidators.onlyNumber]);
      this.formNoResidePeru().get('tipoSwiftAba').setValidators([Validators.required]);
      this.formNoResidePeru().get('numeroSwiftAba').setValidators([Validators.required]);
    } else {
      this.formNoResidePeru().get('bancoIntermediario').clearValidators();
      this.formNoResidePeru().get('paisBancoIntermediario').clearValidators();
      this.formNoResidePeru().get('ciudadBancoIntermediario').clearValidators();
      this.formNoResidePeru().get('cuentaBancoIntermediario').clearValidators();
      this.formNoResidePeru().get('tipoSwiftAba').clearValidators();
      this.formNoResidePeru().get('numeroSwiftAba').clearValidators();
      this.formNoResidePeru().get('bancoIntermediario').reset();
      this.formNoResidePeru().get('paisBancoIntermediario').reset();
      this.formNoResidePeru().get('ciudadBancoIntermediario').reset();
      this.formNoResidePeru().get('cuentaBancoIntermediario').reset();
      this.formNoResidePeru().get('tipoSwiftAba').reset();
      this.formNoResidePeru().get('numeroSwiftAba').reset();
      this.formNoResidePeru().updateValueAndValidity();
    }
  }

  validatePhone(maxLength: number, isResident: boolean): void {
    this.maxlengthPhone = maxLength;
    const numeroTelefono = this.form.get('numeroTelefono');
    numeroTelefono.reset();
    if (isResident) {
      numeroTelefono.setValidators([
        Validators.compose([AppValidators.pattern(new RegExp(/^9(\d){8}$/, 'gi')),
          Validators.minLength(9),
          Validators.maxLength(maxLength)]),
        Validators.required

      ]);
    } else {
      numeroTelefono.setValidators([
        Validators.minLength(9),
        Validators.maxLength(maxLength),
        Validators.required
      ]);
    }

  }

  private validateFiles1(residence: string) {
    if (residence === 'RESIDE_IN_PERU') {
      this.removeValidators(this.formNoResidePeru() as FormGroup);
      const bankcontrol = this.formResidePeru().get('banco');

      this.formResidePeru().get('tipoRetiro').setValue('BANK_DEPOSIT');
      bankcontrol.setValidators(Validators.required);
      this.formResidePeru().get('numeroDeCuenta')
        .setValidators([Validators.required, AppValidators.accoounNumber(bankcontrol), AppValidators.onlyNumber]);
      this.validatePhone(9, true);
      this.formResidePeru().enable();
      this.formNoResidePeru().disable();
    } else {
      this.removeValidators(this.formResidePeru() as FormGroup);

      this.formNoResidePeru().get('bancoDestino').setValidators([Validators.required]);
      this.formNoResidePeru().get('nombreRegistradoBanco').setValidators([Validators.required]);
      this.formNoResidePeru().get('apellidoRegistradoBanco').setValidators([Validators.required]);
      this.formNoResidePeru().get('monedaBancoDestino').setValidators([Validators.required]);
      this.formNoResidePeru().get('numeroCuentaBancoDestino').setValidators([Validators.required, AppValidators.onlyNumber]);
      this.formNoResidePeru().get('tipoSwiftBic').setValidators([Validators.required]);
      this.formNoResidePeru().get('numeroSwiftBic')
        .setValidators([Validators.required, AppValidators.alphaNumeric, Validators.minLength(8), Validators.maxLength(11)]);
      this.formNoResidePeru().get('numeroAbaIban')
        .setValidators([AppValidators.alphaNumeric, Validators.minLength(8), Validators.maxLength(34)]);
      this.formNoResidePeru().get('numeroClaveTransitNumber')
        .setValidators([AppValidators.alphaNumeric, Validators.minLength(8), Validators.maxLength(20)]);
      this.formNoResidePeru().get('tengoBancoIntermediario').setValue('INTERMEDIARY_BANK_ACCOUNT');
      this.formNoResidePeru().get('documentoVoucher').setValidators([Validators.required]);
      this.changeIntermediaryBank({source: null, value: 'INTERMEDIARY_BANK_ACCOUNT'});
      this.validatePhone(15, false);
      this.formResidePeru().disable();
      this.formNoResidePeru().enable();
    }

    this.formResidePeru().updateValueAndValidity();
    this.formNoResidePeru().updateValueAndValidity();
  }

  private validateFiles2(residence: string) {
    if (residence === 'RESIDE_IN_PERU') {
      this.form.get('pais').setValue('PE');
      this.form.get('departamento').setValidators([Validators.required]);
      this.form.get('provincia').setValidators([Validators.required]);
      this.form.get('distrito').setValidators([Validators.required]);
      this.form.get('direccion').setValidators([Validators.required]);
      this.validatePhone(9, true);
      this.form.get('ciudadResidencia').clearValidators();
      this.form.get('direccionResidencia').clearValidators();
      this.form.get('pais').setValue('PE'); // ?
      this.form.get('ciudadResidencia').reset();
      this.form.get('direccionResidencia').reset();
    } else {
      this.form.get('pais').reset();
      this.form.get('ciudadResidencia').setValidators([Validators.required]);
      this.form.get('direccionResidencia').setValidators([Validators.required, Validators.maxLength(100)]);
      this.validatePhone(15, false);
      this.form.get('departamento').clearValidators();
      this.form.get('provincia').clearValidators();
      this.form.get('distrito').clearValidators();
      this.form.get('direccion').clearValidators();
      this.form.get('departamento').reset();
      this.form.get('provincia').reset();
      this.form.get('distrito').reset();
      this.form.get('direccion').reset();
    }

    this.form.updateValueAndValidity();
  }

  private removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        form.get(key).clearValidators();
        form.get(key).reset();
      }
    }
  }

  onSelectProvince(code: string): void {

    this.ubigeo.getProvinces(code);
  }

  onSelectDistrict(code: string): void {
    this.ubigeo.getDistricts(code);
  }

  private subscribeToBankChange() {

    this.formResidePeru().get('banco').valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        filter(Boolean)
      )
      .subscribe((value) => {

        this.formResidePeru().get('numeroDeCuenta').reset();
      });
  }

  private subscribeToStepOneChanges() {

    this.stepOne.valueChanges
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((val) => {

        this.isApvAccept = val.radio === 'SI';
        this.isApvAmountEqualDisbursement = +val.amountAPV === +val.amountWithdraw;
        this.isApvAmountLowerDisbursement = +val.amountAPV < +val.amountWithdraw;

        this.analizeValidations();
      });
  }

  private initValidations() {

    const bankcontrol = this.formResidePeru().get('banco');

    this.formResidePeru().get('numeroDeCuenta')
      .setValidators([Validators.required, AppValidators.accoounNumber(bankcontrol), AppValidators.onlyNumber]);

    this.formResidePeru().get('numeroDeCuenta').disable();
    this.validatePhone(9, true);
  }

  private analizeValidations() {

    if (!this.isApvEnable || this.isApvAmountLowerDisbursement) {

      this.formResidePeru().enable();
      this.formNoResidePeru().disable();
    } else if (this.isApvAmountEqualDisbursement) {

      this.formResidePeru().disable();
      this.formNoResidePeru().disable();
    }
  }

  transitNumberClabe(selected) {
    const listElement = [
      {code: 'CLABE', name: 'CLABE'},
      {code: 'TRANSIT', name: 'Transit number'}
    ];
    const nameSelected = listElement.find(element => element.code === selected.value);
    this.presenter.clabeTransitName = nameSelected.name;
  }

  setAccountStatementValue(value) {
    const state = value ? '1' : '0';
    this.requestState.action(state, 'ACCOUNT_STATEMENT');
  }

  accountTypeName(value) {
    const accountTypes = [
      {code: 'savings', name: 'Cuenta de ahorros'},
      {code: 'checking', name: 'Cuenta corriente'}
    ];

    const selected = accountTypes.find(element => element.code === value);

    this.presenter.accountTypeName = selected.name;
  }

  public openAfpClause() {

    const {afp} = this.stateData;

    switch (afp) {

      case 'INTEGRA':
        window.open('/assets/proteccion_datos/integra_clausula_de_proteccion_de_datos.pdf', '_blank');
        break;

      case 'HABITAT':
        window.open('/assets/proteccion_datos/habitat_clausula_de_proteccion_de_datos.pdf', '_blank');
        break;

      case 'PRIMA':
        window.open('/assets/proteccion_datos/prima_clausula_de_proteccion_de_datos.pdf', '_blank');
        break;

      case 'PROFUTURO':
        window.open('/assets/proteccion_datos/profuturo_clausula_de_proteccion_de_datos.pdf', '_blank');
        break;
    }
  }

  async evaluateFileUpload(event: FileList): Promise<void> {
    const fileSize = event.item(0).size / 1024 / 1024; // size in MB
    // const { afp } = await this.requestState.request.toPromise();
    if (fileSize > 1) {
      this.modal.show('alert', {
        data: {
          title: 'Error en el tamaño del archivo',
          message: 'El archivo no debe pesar más de 1MB'
        }
      });
    } else {
      this.requestState.request.subscribe(
        (state) => this.uploadFile.sendFile(event, state.afp, state.documentNumber, state.documentType)
      ).unsubscribe();
    }
  }
}
