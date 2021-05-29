import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

import { RequestState } from '@aafp/commons/state/request.state';
import { RequestModel } from '../../commons/models/request.model';
import { ResidenteAportePresenter } from './residente-aporte.presenter';
import { Router } from '@angular/router';
import { ModalRejectModel } from '@aafp/commons/models';
import { TypeAccesCode } from '@aafp/commons/models/modal-reject.model';
import { LoaderState } from '@aafp/commons/state/loader.state';
import { map } from 'rxjs/operators';
import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { ApiRequest } from '@aafp/commons/http/request.http';
import { Subscription } from 'rxjs';
import { EUbigeoState } from '@aafp/commons/enums';
import { OsiptelVerifyService } from '@aafp/commons/http/osiptel.http';

@Component({
  selector: 'app-residente-aporte-step',
  templateUrl: './residente-aporte-step.component.html',
  styleUrls: ['./residente-aporte-step.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ResidenteAporteStepComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  stepOne: FormGroup;
  stepTwo: FormGroup;
  subscription = new Subscription();
  stepOneInvalid = false;
  stepTwoInvalid = false;
  minutes = '00';
  seconds = '00';

  public formSubmitted = false;
  userInfo = {} as RequestModel;
  request$ = this.state.request;

  private step = 0;

  constructor(
    private state: RequestState,
    private router: Router,
    public presenter: ResidenteAportePresenter,
    private loaderState: LoaderState,
    private modal: ModalManager,
    private request: ApiRequest,
    private osiptel: OsiptelVerifyService,
  ) {
    this.state.request.subscribe((value) => {
      this.userInfo = value;
    });
  }

  ngOnInit(): void {
    this.registerForm = this.presenter.registerForm;
    this.stepOne = this.presenter.stepOne;
    this.stepTwo = this.presenter.stepTwo;

    this.subscription.add(this.presenter.signatureExpire().subscribe(res => {
      if (res.value <= 1) {
        this.presenter.openModalExpire();
      }
      this.minutes = res.minutes;
      this.seconds = res.seconds;
    }));
    this.subscription.add(this.stepOne.statusChanges.subscribe(value => {
      this.stepOneInvalid = (value === 'VALID') ? false : true;
    }));

    this.subscription.add(this.stepTwo.statusChanges.subscribe(value => {
      this.stepTwoInvalid = (value === 'VALID') ? false : true;
    }));

    sessionStorage.removeItem('ubigeoState');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    sessionStorage.removeItem('ubigeoState');
    this.stepOne.reset();
    this.stepTwo.reset();
    this.registerForm.reset();
  }

  // Revisar en que momento se invoca a esta funcion y sino eliminarla
  registrarSolicitud(event) {
    event.preventDefault();
    this.formSubmitted = true;
  }

  get disabledForm() {
    if (this.step === 0) {
      return this.stepOneInvalid;
    }
    return (this.step === 1 && this.stepTwoInvalid); // Para probar solo paso 2
  }

  /**
   * Indica si el cliente no cumple la regla de ubigeo de su distrito sin dni
   */
  get disableFormByUbigeoOrAFP() {
    return this.step === 1 &&
           sessionStorage.getItem('ubigeoState') &&
           sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_IN_GROUP_ONE_WITHOUT_DNI ||
           sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_WITHOUT_GROUP_AFP_PP;
  }

  get nameBtnNext() {
    if (this.step === 2) {
      return 'Registrar solicitud';
    }

    return 'Continuar';
  }

  public goBack(stepper: MatStepper) {
    if (this.step === 0) {
      this.stepOne.reset();
      this.stepTwo.reset();
      this.router.navigate(['/consulta']);
      return;
    }
    stepper.previous();
    this.step = stepper.selectedIndex;
  }

  public goForward(stepper: MatStepper) {
    const { residencia } = this.registerForm.value.stepTwo;
    if (stepper.selectedIndex === 0) {
      this.verifyAmount(stepper);
    } else if (stepper.selectedIndex === 1 && residencia === 'RESIDE_IN_PERU') {
      this.verifyPhone(stepper);
    } else if (stepper.selectedIndex === 2) {
      this.registerRequest();
    } else {
      stepper.next();
      this.step = stepper.selectedIndex;
    }
  }

  verifyPhone(stepper: MatStepper) {
    const { numeroTelefono } = this.registerForm.value.stepTwo;
    const { documentNumber,  documentType, } = this.userInfo;
    const request = {
      phoneNumber: numeroTelefono,
      documentNumber,
      documentType
    };
    this.loaderState.open();
    this.osiptel.verifyPhone(request).subscribe(() => {
      stepper.next();
      this.step = stepper.selectedIndex;
      this.loaderState.close();
    },
      (err) => {
        this.handleOsiptelError(err, stepper);
      }
    );
  }

  handleOsiptelError(res, stepper) {
    if (res.error.code === 'AFP1001' && stepper.selectedIndex === 1) {
      this.modal.show('osiptel',
      {
        data: {
        stepper,
        title: 'Atención',
        content: 'El número de celular ingresado no se encuentra registrado a tu nombre. Puedes actualizarlo o continuar con tu solicitud.'
      }}
      );
    }
    this.step = stepper.selectedIndex;
    this.loaderState.close();
  }
  verifyAmount(stepper): void {
    if (this.stepOne.value.amountWithdraw < this.userInfo.amountAvailable) {
      this.modal.show('amountConfirm',
        {
          data: {
            onClose: () => {
              stepper.next();
              this.step = stepper.selectedIndex;
            },
            title: 'Atención',
            content: 'El monto de retiro ingresado es menor al monto disponible para retiro.\n' +
              'Asegúrate que el monto ingresado sea el correcto.'
          }});
    } else {
      stepper.next();
      this.step = stepper.selectedIndex;
    }
  }
  private async stateData(param) {
    let request;
    this.request$.subscribe(data => request = data);

    return await { ...request, ...param };
  }

  async registerRequest() {
    // this.state.requestStepperCurrent = request;
    const request = await this.stateData(this.prepareRequest());
    const { signature, ...body } = request;
    const newBody = this.prepareBody(body);

    this.loaderState.open();
    this.request.register(newBody)
      .pipe(map(data => this.prepareDateRequest(data)))
      .subscribe(
        data => this.sucessRequest(data),
        error => this.failRequest(error)
      );
  }

  prepareBody(body: any) {
    const newBody = body;
    delete newBody.flow;
    delete newBody.subflow;
    delete newBody.questions;
    delete newBody.answers;
    delete newBody.positiveBalance;
    delete newBody.potentialRetention;

    return this.parseAmountValues(newBody);
  }

  private sucessRequest(response) {
    this.loaderState.close();
    this.state.action(response, 'REQUEST_SUCCESS');
    this.state.requestStepperCurrent = this.prepareRequest();
    this.router.navigate(['/registro-exitoso']);
  }

  private failRequest(httpError) {
    this.loaderState.close();
    let errorCode: TypeAccesCode = 'REQUEST_NOT_PROCESS';

    if (httpError.status === 403) {
      errorCode = 'REQUEST_EXPIRY';
    } else if (httpError.status === 409) {
      errorCode = 'REQUEST_ALREADY_REGISTERED';
    } else if (httpError.status === 410) {
      if (httpError.error) {
        switch (httpError.error.code) {
          case 'AFP0004':
            errorCode = 'BANK_ACCOUNT_NUMBER_ALREADY_REGISTERED';
            break;
          case 'AFP0005':
            errorCode = 'EMAIL_ALREADY_REGISTERED';
            break;
          case 'AFP0006':
            errorCode = 'CELLPHONE_ALREADY_REGISTERED';
            break;
          default:
            break;
        }
      }
    }

    const title = httpError.status === 409 ? 'Solicitud existente' : '';
    let data: ModalRejectModel | object = new ModalRejectModel(errorCode, title, [], true);

    if (httpError.status === 409) {
      data = this.prepareDateRequest(httpError.error.meta);
      data = { reset: true, code: errorCode, ...data };
      this.modal.show('request', { width: '390px', data });

      return;
    }

    // this.modal.show('reject', { data });
  }

  prepareRequest() {

    const { amountAPV, fundAPV, amountWithdraw } = this.stepOne.value;
    const {
      ciudadResidencia,
      direccionResidencia,
      correoElectronico,
      departamento,
      direccion,
      distrito,
      numeroTelefono,
      pais,
      provincia,
      residencia,
      saldoResidoNoPeru,
      saldoResidoPeru,
      accountStatusFlag
    } = this.registerForm.value.stepTwo;

    const {
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      cuspp,
      afp,
      amountAvailable,
      documentNumber,
      documentType,
      birthdate
    } = this.userInfo;

    const isEqualWithDrawApv = +amountWithdraw === +amountAPV;

    const requestData = {
      documentType,
      documentNumber,
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      birthdate,
      afp,
      cuspp,
      amountAvailable,
      amountWithdraw,
      amountVoluntaryFund: amountAPV,
      voluntaryFundType: fundAPV,
      address: {
        country: pais,
        ubigeo: distrito || null,
        city: ciudadResidencia || null,
        location: direccion || direccionResidencia || null,
        residenceAbroad: residencia === 'RESIDE_IN_PERU' ? false : true,
      },
      ...this.getPaymentInfo(isEqualWithDrawApv),
      personalDataClause: true, // ??
      changeMandatoryAccountToZeroFund: true, // ??
      sendVirtualAccountStatus: accountStatusFlag,
      cellphoneValidationOpsitelIndicator: true, // ??
      email: correoElectronico || null,
      cellphone: numeroTelefono || null,
    };
    return requestData;
  }

  private prepareDateRequest(data) {
    const registerDate = data.registerDate ? data.registerDate.split('T') : [];
    const date = registerDate.length > 0 ? registerDate[0].split('-').reverse().join('-') : '';
    const time = registerDate.length > 0 ? registerDate[1].substring(':', 5) : '';
    const bankName = this.presenter.codeDescripcion.banco;
    return {
      number: data.requestNumber,
      email: data.email,
      cellphone: data.cellphone,
      bankAccountNumber: data.bankAccountNumber,
      bankName,
      date,
      time,
    };
  }
  evaluatePaymentType(tipoRetiro, banco): string {
    const { afp } = this.userInfo;
    if (afp === 'PROFUTURO' || afp === 'PRIMA' && banco) {
        return 'BANK_DEPOSIT';
    }
    return tipoRetiro;
  }

  private getPaymentInfo(isEqualWithDrawApv: boolean) {
    const { residencia } = this.registerForm.value.stepTwo;
    const ubigeoInvalid = sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_IN_GROUP_ONE_WITH_DNI ||
                          sessionStorage.getItem('ubigeoState') === EUbigeoState.DISTRICT_WITHOUT_GROUP_AFP_PP;

    if (isEqualWithDrawApv || ubigeoInvalid) {
      return;
    }
    const { tipoRetiro, banco, numeroDeCuenta } = this.presenter.saldoResidoPeru.value;
    const paymentType = residencia === 'RESIDE_IN_PERU' ? this.evaluatePaymentType(tipoRetiro, banco) : 'WINDOW_PAYMENT';

    const { filename } = this.userInfo;

    const {
      apellidoRegistradoBanco,
      bancoDestino,
      bancoIntermediario,
      ciudadBancoDestino,
      ciudadBancoIntermediario,
      cuentaBancoIntermediario,
      // documentoVoucher,
      monedaBancoDestino,
      nombreRegistradoBanco,
      numeroAbaIban,
      numeroClaveTransitNumber,
      numeroCuentaBancoDestino,
      numeroSwiftAba,
      numeroSwiftBic,
      paisBancoIntermediario,
      tengoBancoIntermediario,
      tipoAbaIban,
      tipoClaveTransitNumber,
      tipoDeCuenta,
      tipoSwiftAba,
      tipoSwiftBic
    } = this.presenter.saldoResidoNoPeru.value;

    return {
      payment: {
        type: paymentType,
        bankDeposit: {
          name: bancoDestino || banco || null,
          type: 'domestic',  // ????
          location: ciudadBancoDestino || null,
          accountTitleNames: nombreRegistradoBanco || null,
          accountTileLastNames: apellidoRegistradoBanco || null,
          accountNumber: numeroDeCuenta || numeroCuentaBancoDestino || null,
          accountType: tipoDeCuenta || 'savings', // only for integration test
          currency: monedaBancoDestino || 'PEN', // only for integration test
          swiftBicCodeNumber: numeroSwiftBic || null,
          swiftBicType: tipoSwiftBic,
          abaIbanCodeNumber: numeroAbaIban || null,
          abaIbanType: tipoAbaIban,
          transitNumberType: tipoClaveTransitNumber || null,
          transitNumber: numeroClaveTransitNumber || null,
          voucherFileName: filename,
        },
        intermediaryBankDeposit: tengoBancoIntermediario === 'INTERMEDIARY_BANK_ACCOUNT' ? {
          name: bancoIntermediario || null,
          type: 'domestic',
          location: ciudadBancoIntermediario || null,
          accountTitleNames: null,
          accountTileLastNames: null,
          accountNumber: cuentaBancoIntermediario || '',
          accountType: null,
          currency: null,
          country: paisBancoIntermediario,
          swiftBicCodeNumber: numeroSwiftAba || null,
          swiftBicType: tipoSwiftAba, // no tiene formcontrolname
          abaIbanCodeNumber: null, // no existe en intermediario
          abaIbanType: null, // no existe en intermediario
          transitNumber: null, // no existe en intermediario
        } : null,
        withdrawBankName: bancoDestino || null
      }
    };
  }

  private parseAmountValues(params: any) {

    const clone = Object.assign({}, params);
    clone.amountAvailable = parseInt(parseFloat(params.amountAvailable).toFixed(2));
    clone.amountWithdraw = parseInt(parseFloat(params.amountWithdraw).toFixed(2));
    clone.amountVoluntaryFund = params.amountVoluntaryFund ? parseInt(parseFloat(params.amountVoluntaryFund).toFixed(2)) : '0';
    const { ...payload } = clone;

    return payload;
  }
}
