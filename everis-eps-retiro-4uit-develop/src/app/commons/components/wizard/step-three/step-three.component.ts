import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UIT } from '@aafp/commons/constants/uit';
import { ResidenteAportePresenter } from 'src/app/views/residente-aporte-step/residente-aporte.presenter';
import { Ubigeo } from '@aafp/commons/http/ubigeo.http';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {

  form: FormGroup;
  stepOne: FormGroup;

  public uit = UIT;
  public firstName: string;

  constructor(
    public presenter: ResidenteAportePresenter,
    public ubigeo: Ubigeo,
    private storage: SessionStorage,
  ) {
  }

  ngOnInit(): void {
    this.form = this.presenter.registerForm;
    this.stepOne = this.presenter.stepOne;
    this.firstName = this.storage.get('firstName' || '').toLowerCase();
  }

  get radioValue() {
    return this.stepOne.get('radio').value;
  }

  get residenceIsPeru() {
    return this.formStepTwo.get('residencia').value === 'RESIDE_IN_PERU';
  }

  get residenceCountry() {

    const selectedCountry = this.formStepTwo.get('pais').value;
    const nameCountry = this.ubigeo.countries.filter((country) => country.code === selectedCountry);

    return nameCountry.length ? nameCountry[0].description : 'PAIS INVÁLIDO';
  }

  get bankName() {

    const selectedBank = this.formSaldoResidoPeru.get('banco').value;
    const nameBank = this.ubigeo.banks.filter((country) => country.code === selectedBank);

    return nameBank.length ? nameBank[0].description : null;
  }

  get intermediateBankAccountType() {

    const type = this.formSaldoNoResidoPeru.get('tipoDeCuenta').value;

    return type === 'checking' ? 'Cuenta corriente' : 'Cuenta de ahorros';
  }

  get withdrawType() {

    const type = this.formSaldoResidoPeru.get('tipoRetiro').value;

    return type === 'BANK_DEPOSIT' ? 'Depósito en cuenta' : 'No tengo cuenta bancaria';
  }

  get intermediateBankCountry() {

    const selectedIntermediateBank = this.formSaldoNoResidoPeru.get('paisBancoIntermediario').value;
    const intermediateBankCountryName = this.ubigeo.countries.filter((country) => country.code === selectedIntermediateBank);

    return intermediateBankCountryName.length ? intermediateBankCountryName[0].description : '-';
  }

  get currencyDestinyBank() {

    const selectedCurrency = this.formSaldoNoResidoPeru.get('monedaBancoDestino').value;
    const nameCurrency = this.ubigeo.currencies.filter((currency) => currency.code === selectedCurrency);

    return nameCurrency.length ? nameCurrency[0].description : 'PAIS INVÁLIDO';
  }

  get typeWithdrawal() {
    return this.formStepTwo.get('tipoRetiro').value === 'BANK_DEPOSIT';
  }

  get formStepTwo() {
    return this.form.get('stepTwo') as FormGroup;
  }

  get formSaldoResidoPeru() {
    return this.form.get('stepTwo').get('saldoResidoPeru') as FormGroup;
  }

  get formSaldoNoResidoPeru() {
    return this.form.get('stepTwo').get('saldoResidoNoPeru') as FormGroup;
  }

  get amountAvailable() {
    return this.storage.get('amountAvailable') ? Number(this.storage.get('amountAvailable')) : '';
  }

  get amountWithdraw() {
    const currentAmountAPV = Number(this.stepOne.get('amountAPV').value);
    const currentAmountWithDraw = Number(this.stepOne.get('amountWithdraw').value);

    // return currentAmountAPV ? currentAmountWithDraw - currentAmountAPV : currentAmountWithDraw;

    return currentAmountWithDraw;
  }

  get amountAPV() {
    return +this.stepOne.get('amountAPV').value;
  }

  get amountWithdrawBank() {
    return this.amountWithdraw - this.amountAPV;
  }
}
