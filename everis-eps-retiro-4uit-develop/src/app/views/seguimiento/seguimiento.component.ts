import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { AppDateAdapter } from '@aafp/commons/models/datepicker.model';
import { AppValidators } from '@aafp/commons/validators/validators';
import { environment } from '@aafp/env/environment';
import { I18n } from '@aafp/commons/services';
import { SeguimientoPresenter } from './seguimiento.presenter';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss'],
  providers: [
    SeguimientoPresenter,
    I18n,
    { provide: DateAdapter, useClass: AppDateAdapter }
  ],
})
export class SeguimientoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  maxLengthtDocument = '8';
  maxLengthtVerificationCode = '1';
  subcription: Subscription = new Subscription();
  recaptcha = new FormControl('', [AppValidators.required]);
  captchaKey: string;
  documentType = new FormControl('DNI', [AppValidators.required]);
  documentNumber = new FormControl('', [AppValidators.required, AppValidators.maxLengthDNI(this.documentType)]);
  digit = new FormControl('', [AppValidators.required, AppValidators.onlyNumber]);
  lang: any;

  constructor(
    public presenter: SeguimientoPresenter,
    private i18n: I18n,
  ) {
    this.lang = this.i18n.getLang('views.query', 'commons.buttons');
    this.captchaKey = environment.captchaKey;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      recaptcha: this.recaptcha,
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      digit: this.digit
    });

    this.subcription.add(
      this.form.controls.documentType.valueChanges.subscribe(() => this.resetInfo())
    );

    this.subcription.add(
      this.form.controls.documentType.valueChanges.subscribe(value => this.setMaxLengthDni(value))
    );

    this.subcription.add(
      this.form.controls.documentType.valueChanges.subscribe(value => this.setEnableDigit(value))
    );

  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  private setMaxLengthDni(value) {
    if (value === 'DNI') {
      this.maxLengthtDocument = '8';
    } else {
      this.maxLengthtDocument = '20';
    }
  }

  private setEnableDigit(value) {
    if (value === 'DNI') {
      this.form.controls.digit.enable();
    } else {
      this.form.controls.digit.disable();
    }
  }

  private resetInfo() {
    if (this.form.controls.documentNumber.value !== '') {
      this.form.controls.documentNumber.reset();
      this.form.controls.digit.reset();

      if (this.form.controls.documentType.value !== 'DNI') {
        this.form.controls.digit.disable();
        return;
      }
      this.form.controls.digit.enable();
    }
  }
}
