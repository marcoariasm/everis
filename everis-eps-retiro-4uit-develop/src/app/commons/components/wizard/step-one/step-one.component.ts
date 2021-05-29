import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { UIT } from '@aafp/commons/constants/uit';
import { AppValidators } from '@aafp/commons/validators/validators';
import { ResidenteAportePresenter } from 'src/app/views/residente-aporte-step/residente-aporte.presenter';
import { ModalManager } from '../../../modal-manager/modal-manager';
import { RequestState } from '@aafp/commons/state/request.state';
import { Subscription } from 'rxjs';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit, OnDestroy {

  form: FormGroup;
  registerForm: FormGroup;
  request$ = this.requestState.request;
  stateData: any;
  subscription = new Subscription();
  affiliateAge: number;
  fundTypeDefault: number;
  fundTypeOptions: any[];

  public uit = UIT;

  constructor(
    public presenter: ResidenteAportePresenter,
    private requestState: RequestState,
    private modal: ModalManager,
    private storage: SessionStorage,
  ) {
    this.freeAvailabilityOffer();
  }

  ngOnInit(): void {
    this.form = this.presenter.stepOne;
    this.registerForm = this.presenter.registerForm;
    const { radio, amountWithdraw, fundAPV, amountAPV } = this.form.controls;

    amountWithdraw.setValidators([
      Validators.required,
      AppValidators.amountBalance(parseFloat(this.amountAvailable.toString())),
      AppValidators.onlyNumber,
      Validators.min(1),
    ]);

    this.readStateData();
    this.loadFundTypesCombo();
    this.validateFundType();

    this.subscription.add(radio.valueChanges.subscribe(value => this.changeApv(value)));
    this.subscription.add(amountWithdraw.valueChanges.subscribe((value) => {

      // amountAPV.setValidators([AppValidators.amountBalance(value), Validators.min(1), Validators.required, AppValidators.onlyNumber]);
      amountAPV.updateValueAndValidity();
    }
    ));

    if (this.storage.get('retentionFlag') === '0') {
      radio.setValidators(null);
      amountAPV.setValidators(null);
      fundAPV.setValidators(null);
    }

  }

  validateFundType() {
    const { fundAPV, amountWithdraw } = this.form.controls;
    const { fundType,  afp } = this.stateData;
    if (fundType && fundType !== '') {
       if (afp === 'PRIMA' || afp === 'HABITAT'){
        fundAPV.disable();
      } else {
        fundAPV.enable();
      }
    }
    if (afp === 'PROFUTURO') {
      setTimeout(() => {
        amountWithdraw.setValue(this.amountAvailable, {onlySelf: true});
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private freeAvailabilityOffer() {
    if (this.amountAvailable > this.uit) {
      this.presenter.stepOne.controls.radio.setValidators([
        Validators.required
      ]);
    }
  }

  private loadFundTypesCombo() {
    let defaultFundType = 0;
    // let defaultFundType = null; //Revisar que valor por defecto va a quedar
    this.fundTypeOptions = [
      { id: 0, name: 'Fondo 0' },
      { id: 1, name: 'Fondo 1' },
      { id: 2, name: 'Fondo 2' },
      { id: 3, name: 'Fondo 3' }
    ];
    if (this.isAffiliateOlder(this.stateData.age, this.stateData.fundType)) {
      this.fundTypeOptions.shift();
      defaultFundType = 1;
      // defaultFundType = 1; //Revisar que valor por defecto va a quedar
    }
    /** Esta condicion se esta agregando por inconsistencia en la data reportada por las AFP,
     * ya que estan informando el tipo de fondo con letras y nuemros mayores a 3
     */
    if (['0', '1', '2', '3'].indexOf(String(this.stateData.fundType)) === -1) {
      this.stateData.fundType = '';
    }

    this.form.controls.fundAPV.setValue(this.stateData.fundType ? Number(this.stateData.fundType) : defaultFundType);
  }

  private isAffiliateOlder(affiliateAge: number, fundType: string) {
    return affiliateAge && affiliateAge < 60;
  }

  isValidAfpType() {
    return !!(this.stateData.afp && (this.stateData.afp === 'PROFUTURO' || this.stateData.afp === 'INTEGRA'));
  }

  isNotInformedFundType() {
    return !!(this.stateData.fundType === '');
  }

  async readStateData() {
    let request: any;
    this.request$.subscribe(data => request = data).unsubscribe();
    this.stateData = { ...request };
  }

  showModalContentLibreDis() {
    this.modal.show('contentLibredis', { width: '30vw' });
  }

  public hasErrors(key: string) {
    const control = this.form.get(key);
    return control.errors && (control.dirty || control.touched);
  }

  get firstName() {
    return this.storage.get('firstName' || '').toLowerCase();
  }

  get amountAvailable() {
    const maxWithdraw = 4 * UIT;
    const amountAvailable = this.storage.get('amountAvailable') ? Number(this.storage.get('amountAvailable')) : '';
    if (amountAvailable !== '' && amountAvailable > maxWithdraw) {
      return maxWithdraw;
    } else {
      return amountAvailable;
    }
  }

  get retentionFlag() {
    return Number(this.storage.get('retentionFlag' || ''));
  }

  private changeApv(value: string) {
    const amountWithdraw = this.form.controls.amountWithdraw.value || 0;
    if (value === 'SI') {
      this.form.controls.amountAPV.setValidators([
        Validators.required,
        AppValidators.onlyNumber,
        Validators.min(1),
      ]);

      this.form.controls.amountAPV.setAsyncValidators(AppValidators.amountBalanceAsync(this.form.controls.amountWithdraw));
    } else {
      this.form.controls.amountAPV.reset();
      this.form.controls.amountAPV.clearValidators();
      this.form.controls.amountAPV.clearAsyncValidators();
    }
    this.form.controls.amountAPV.updateValueAndValidity();
  }

}
