import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppValidators } from '@aafp/commons/validators/validators';
import { ModalRejectModel } from '../../commons/models/modal-reject.model';
import { RequestState } from '../../commons/state/request.state';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ModalManager } from '../../commons/modal-manager/modal-manager';

@Injectable({
  providedIn: 'root',
})
export class ResidenteAportePresenter {
  request$ = this.requestState.request;
  registerForm: FormGroup;
  public stepOne: FormGroup;
  public codeDescripcion = {
    departamento: '',
    provincia: '',
    distrito: '',
    pais: '',
    paisBancoIntermediario: '',
    monedaBancoDestino: '',
    banco: '',
  };
  clabeTransitName = '';
  accountTypeName = '';

  constructor(private formBuilder: FormBuilder, private requestState: RequestState, private modal: ModalManager,) {
    this.loadForm();
  }
  get stepTwo() {
    return this.registerForm.get('stepTwo') as FormGroup;
  }

  get saldoResidoPeru() {
    return this.stepTwo.get('saldoResidoPeru') as FormGroup;
  }

  get saldoResidoNoPeru() {
    return this.stepTwo.get('saldoResidoNoPeru') as FormGroup;
  }

  loadForm() {
    this.stepOne = this.formBuilder.group({
      amountWithdraw: ['', Validators.required],
      radio: [''],
      amountAPV: [''],
      fundAPV: [''],
    });
    this.registerForm = this.formBuilder.group({
      stepTwo: this.stepTwoForm,
    });
  }

  public get stepTwoForm() {
    return this.formBuilder.group({
      residencia: ['RESIDE_IN_PERU', Validators.required],
      pais: ['PE', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      ciudadResidencia: [''],
      direccionResidencia: ['', Validators.maxLength(100)],
      numeroTelefono: [
        '', [Validators.required]
      ],
      correoElectronico: ['', Validators.compose([AppValidators.email, Validators.required])],
      accountStatusFlag: [true],
      personalDataCheck: [true, Validators.required],
      saldoResidoPeru: this.formBuilder.group({
        tipoRetiro: ['BANK_DEPOSIT', Validators.required],
        banco: ['', Validators.required],
        numeroDeCuenta: ['', Validators.required],
      }),
      saldoResidoNoPeru: this.formBuilder.group({
        bancoDestino: [''],
        ciudadBancoDestino: [''],
        nombreRegistradoBanco: [''],
        apellidoRegistradoBanco: [''],
        monedaBancoDestino: [''],
        tipoDeCuenta: [''],
        numeroCuentaBancoDestino: [''],
        documentoVoucher: [''],
        tipoSwiftBic: [''],
        numeroSwiftBic: [''],
        tipoAbaIban: [''],
        numeroAbaIban: [''],
        tipoClaveTransitNumber: [''],
        numeroClaveTransitNumber: [''],
        tengoBancoIntermediario: [''],
        bancoIntermediario: [''],
        paisBancoIntermediario: [''],
        ciudadBancoIntermediario: [''],
        cuentaBancoIntermediario: [''],
        tipoSwiftAba: [''],
        numeroSwiftAba: [''],
      }),
    });
  }
  signatureExpire() {
    const seconds = 480 + 2;

    return interval(1000).pipe(
      take(seconds),
      map(value => {
        return seconds - value;
      }),
      map(value => {
        const res = {
          value,
          minutes: this._to2digit(Math.floor((value - 2) / 60)),
          seconds: this._to2digit(Math.floor((value - 2)) % 60),
        };

        return res;
      }));
  }

  _to2digit(n: number) {
    if (n > 0) {

      return ('00' + n).slice(-2);
    } else {

      return '00';
    }
  }

  openModalExpire() {
    const data = new ModalRejectModel('REQUEST_EXPIRY', 'REDIRECT_LANDING', [], true);
    this.requestState.reset();
    this.modal.show('reject', { data });
  }


}
