import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequesPresenter } from './request.presenter';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { RequestState } from '@aafp/commons/state/request.state';
import { AppValidators } from '@aafp/commons/validators/validators';
import { ModalRejectModel, TypeAccesCode, MESSAGES } from '@aafp/commons/models/modal-reject.model';
import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { LoaderState } from '@aafp/commons/state/loader.state';
import { IAffiliate } from '@aafp/commons/interfaces';
import ubigeoGrouped from '@aafp/data/ubigeo.grouped.json';
import { I18n } from '@aafp/commons/services';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  providers: [RequesPresenter, I18n],
})
export class RequestComponent implements OnInit, OnDestroy {
  request$ = this.requestState.request;
  form: FormGroup;
  lenghAccount = '14';
  email = new FormControl('', [AppValidators.required, AppValidators.email]);
  cellphone = new FormControl('', [AppValidators.pattern(new RegExp(/^9(\d){8}$/, 'gi'))]);
  paymentType = new FormControl('', [AppValidators.required]);
  bank = new FormControl('', [AppValidators.required]);
  bankAccountNumber = new FormControl('', [
    AppValidators.required,
    AppValidators.accoounNumber(this.bank),
    AppValidators.onlyNumber,
    AppValidators.isBN(this.bank)
  ]);
  departamento = new FormControl('', [AppValidators.required]);
  provincia = new FormControl('', [AppValidators.required]);
  ubigeo = new FormControl('', [AppValidators.required]);
  address = new FormControl('', [AppValidators.required]);
  accountStatement: boolean;
  subscription = new Subscription();
  minutes = '00';
  seconds = '00';
  departamentoArr = [];
  provinciaArr = [];
  distritoArr = [];
  affiliate: IAffiliate = {};
  isBN: boolean;
  MSG: any;
  lang: any;
  BANKS_MSG = ['BANBIF', 'BBVA', 'BCP', 'CAJAHUANCAYO', 'IBK', 'SCOTIA'];
  BANKS_ALL = [
    { value: 'BANBIF', text: 'Banbif' },
    { value: 'BN', text: 'Banco de la Nación' },
    { value: 'BBVA', text: 'BBVA' },
    { value: 'BCP', text: 'BCP' },
    { value: 'CAJAHUANCAYO', text: 'Caja Huancayo' },
    { value: 'IBK', text: 'Interbank' },
    { value: 'SCOTIA', text: 'Scotiabank' }
  ];
  BANKS_UBIGEO = [
    { value: 'BBVA', text: 'BBVA' },
    { value: 'IBK', text: 'Interbank' },
    { value: 'SCOTIA', text: 'Scotiabank' }
  ];
  BANKS_MSG_ADDITIONAL = ['BBVA', 'IBK'];
  BANKS = [];
  private ubigeoGrouped: any = ubigeoGrouped;

  constructor(
    public presenter: RequesPresenter,
    private requestState: RequestState,
    private router: Router,
    private loaderState: LoaderState,
    private modal: ModalManager,
    private i18n: I18n
  ) {
    this.MSG = MESSAGES;
    this.BANKS = this.BANKS_ALL;
    this.lang = this.i18n.getLang('views.request', 'commons.buttons', 'commons.affiliate');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: this.email,
      cellphone: this.cellphone,
      paymentType: this.paymentType,
      bank: this.bank,
      bankAccountNumber: this.bankAccountNumber,
      departamento: this.departamento,
      provincia: this.provincia,
      ubigeo: this.ubigeo,
      address: this.address
    });

    this.request$.subscribe((values: IAffiliate) => {
      this.affiliate = values;
    });

    this.presenter.getUbigeo().subscribe(value => {
      this.departamentoArr = value;
      this.loaderState.close();
    }, error => this.closeModal(error));

    this.subscription.add(this.form.controls.paymentType.valueChanges.subscribe((value) => {
      this.bank.setValue('');
      this.bankAccountNumber.setValue('');
      this.isBN = false;

      if (value === 'WINDOW_PAYMENT') {
        if (this.showUbigeoBanks()) {
          this.form.controls.bank.enable();
          this.form.controls.bank.reset();
        } else {
          this.form.controls.bank.disable();
        }

        this.form.controls.bankAccountNumber.reset();
        this.form.controls.bankAccountNumber.disable();

        return;
      }

      this.form.controls.bank.enable();
      this.form.controls.bankAccountNumber.enable();
    }));

    this.subscription.add(this.form.controls.bank.valueChanges.subscribe(() => {
      if (this.bankAccountNumber.value !== '') {
        this.bankAccountNumber.reset();
      }
    }));

    this.subscription.add(
      this.paymentType.valueChanges.subscribe(value => this.presenter.showModalNotBank(value, this.ubigeo.value, this.affiliate))
    );

    this.subscription.add(
      this.departamento.valueChanges.subscribe(value => {
        if (value !== '') {
          this.presenter.getUbigeo(value).subscribe(res => {
            this.provinciaArr = res;
            this.loaderState.close();
          }, error => this.closeModal(error));
        }
      })
    );

    this.subscription.add(
      this.provincia.valueChanges.subscribe(value => {
        if (value !== '') {
          this.presenter.getUbigeo(value).subscribe(res => {
            this.distritoArr = res;
            this.loaderState.close();
          }, error => this.closeModal(error));
        }
      })
    );

    this.subscription.add(
      this.ubigeo.valueChanges.subscribe(value => {
        if (value !== '' && this.form.get('paymentType').value === 'WINDOW_PAYMENT') {
          this.presenter.showModalNotBank('WINDOW_PAYMENT', value, this.affiliate);

          if (this.showUbigeoBanks()) {
            this.form.controls.bank.enable();
            this.form.controls.bank.reset();
            this.form.controls.bankAccountNumber.disable();
          } else {
            this.form.controls.bank.disable();
            this.form.controls.bankAccountNumber.disable();
          }
        } else {
          this.form.controls.bank.enable();
          this.form.controls.bankAccountNumber.enable();
        }
      })
    );

    this.subscription.add(this.presenter.signatureExpire().subscribe(res => {
      if (res.value <= 1) {
        this.presenter.openModalExpire();
      }
      this.minutes = res.minutes;
      this.seconds = res.seconds;
    }));

    this.form.controls.paymentType.setValue('BANK_DEPOSIT');
    this.isBN = false;
    this.accountStatement = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.requestState.reset();
  }

  back(): void {
    this.router.navigate(['/consulta']);
  }
  focusPhone() {
    if (this.cellphone.value === '') {
      this.cellphone.setValue('9');
    }
  }
  focusAccountBank() {
    if (this.bank.value === 'BCP') {
      this.lenghAccount = '14';
    } else if (this.bank.value === 'BBVA' || this.bank.value === 'CAJAHUANCAYO') {
      this.lenghAccount = '18';
    } else if (this.bank.value === 'SCOTIA' || this.bank.value === 'BN') {
      this.lenghAccount = '10';
    } else if (this.bank.value === 'IBK') {
      this.lenghAccount = '13';
    } else if (this.bank.value === 'BANBIF' || this.bank.value === 'PICHINCHA') {
      this.lenghAccount = '12';
    }

    if (this.bank.value === 'BN' && this.bankAccountNumber.value && !this.bankAccountNumber.value.startsWith('4')) {
      const errorCode: TypeAccesCode = 'ERROR_NATION_BANK_DIGIT';
      this.modal.show('reject', { data: new ModalRejectModel(errorCode, 'ERROR', [], false, false, 'Continuar') });
    }
  }
  closeModal(error = '') {
    this.loaderState.close();
    this.presenter.openModalGenericError();
  }

  /**
   * Determines the bank selection
   * @param value input
   */
  selectionBank(value: string) {
    const isBankMSG = this.BANKS_MSG.includes(value);
    this.isBN = value === 'BN' ? true : false;

    if (isBankMSG) {
      if (this.BANKS_MSG_ADDITIONAL.includes(value) && this.paymentType.value === 'WINDOW_PAYMENT') {
        const data = new ModalRejectModel('BANKS_MSG_ADDITIONAL', undefined, [], false, false, 'Continuar');
        this.modal.show('reject', { data });
      } else {
        const data = new ModalRejectModel('BANK_MSG', undefined, [], false, false, 'Continuar');
        this.modal.show('reject', { data });
      }
    }

    if (this.isBN) {
      const data = new ModalRejectModel('BANK_NATION', undefined, [], false, false, 'Continuar');
      this.modal.show('reject', { data });
    }
  }

  hasUbigeoB() {
    const {groupa = [], groupb = []} = this.ubigeoGrouped;
    const ubigeo = this.form.get('ubigeo').value;
    const existUbigeoA = groupa.includes(ubigeo);
    const existUbigeoB = groupb.includes(ubigeo);

    return existUbigeoB && !existUbigeoA;
  }

  hasUbigeoNone() {
    const {groupa = [], groupb = []} = this.ubigeoGrouped;
    const ubigeo = this.form.get('ubigeo').value;
    const existUbigeoA = groupa.includes(ubigeo);
    const existUbigeoB = groupb.includes(ubigeo);

    return !existUbigeoB && !existUbigeoA;
  }

  isAfpProfuturo() {
    const { afp } = this.affiliate;

    return afp === 'PROFUTURO';
  }

  showUbigeoBanks() {
    return ((this.hasUbigeoB() || this.hasUbigeoNone()) && !this.isAfpProfuturo()) || (this.hasUbigeoB() && this.isAfpProfuturo());
  }

  isGroupNoneAndProfuturo() {
    return this.form.get('paymentType').value === 'WINDOW_PAYMENT' && this.isAfpProfuturo() && this.hasUbigeoNone();
  }
}
