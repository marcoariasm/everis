import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { AppDateAdapter, APP_DATE_FORMATS } from '@aafp/commons/models/datepicker.model';
import { AppValidators } from '@aafp/commons/validators/validators';
import { environment } from '@aafp/env/environment';
import { I18n } from '@aafp/commons/services';
import { QueryPresenter } from './query.presenter';
import { EFlow } from '@aafp/commons/enums';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [
    QueryPresenter,
    I18n,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class QueryComponent implements OnInit, OnDestroy {
  form: FormGroup;
  maxLengthtDocument = '8';
  maxLengthtVerificationCode = '1';
  subcription: Subscription = new Subscription();
  recaptcha = new FormControl('', [AppValidators.required]);
  captchaKey: string;
  documentType = new FormControl('DNI', [AppValidators.required]);
  documentNumber = new FormControl('', [AppValidators.required, AppValidators.maxLengthDNI(this.documentType)]);
  digit = new FormControl('', [AppValidators.required, AppValidators.onlyNumber]);
  birthdate = new FormControl('', [AppValidators.required]);
  flowType = new FormControl(EFlow.FLOW2k);
  minDate: Date;
  maxDate: Date;
  lang: any;

  constructor(
    public presenter: QueryPresenter,
    private i18n: I18n,
  ) {
    this.lang = this.i18n.getLang('views.query', 'commons.buttons');
    this.setRangeDate();
    this.captchaKey = environment.captchaKey;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      recaptcha: this.recaptcha,
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      digit: this.digit,
      birthdate: this.birthdate,
      flowType: this.flowType,
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

  private setRangeDate() {
    const range = environment.config.birthdate.range;
    const start = environment.config.birthdate.start;
    const currentDate = moment().subtract(start, 'y').format('YYYY-MM-DD');
    const currentDateArr = currentDate.split('-');
    const currentYear = parseInt(currentDateArr[0], 10);
    const currentMonth = parseInt(currentDateArr[1], 10) - 1;
    const currentDay = parseInt(currentDateArr[2], 10);

    this.minDate = new Date(currentYear - range, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
  }
}
