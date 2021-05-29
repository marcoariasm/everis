import { Component, OnInit, OnDestroy } from '@angular/core';
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
  IFlow,
  EState,
  DOCUMENT_TYPE,
} from '@everis-afp-prima/data';
import { ValidationPresenter } from './validation.presenter';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'everis-afp-prima-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  providers: [
    ValidationPresenter,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class ValidationComponent implements OnInit, OnDestroy {
  state$ = this.requestState.request;
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  isQuery: boolean;
  maxLengthtDocument = '8';
  subcription: Subscription = new Subscription();
  documentType = new FormControl('DNI', [AppValidators.required]);
  maxDateBirthday: Date;
  documentTypeOptions = DOCUMENT_TYPE;
  alphaNumeric = 'isAlphaNumeric';

  constructor(
    private requestState: RequestState,
    public presenter: ValidationPresenter
  ) {
    this.setMaxDateBirthday();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      isAffiliate: new FormControl(null, [AppValidators.required]),
      recaptcha: new FormControl('', [AppValidators.required]),
      documentType: this.documentType,
      documentNumber: new FormControl('', [
        AppValidators.required,
        AppValidators.maxLengthDNI(this.documentType),
      ]),
      birthdate: new FormControl('', [
        AppValidators.required,
        AppValidators.birthDateMaxYear,
      ]),
      fullName: new FormControl(null),
      code: new FormControl(null),
    });
    this.setRangeDate();
    this.subcription.add(
      this.form.controls.documentType.valueChanges.subscribe((value) =>
        this.setMaxLengthDni(value)
      )
    );
    this.subcription.add(
      this.form.controls.documentType.valueChanges.subscribe(() =>
        this.resetInfo()
      )
    );

    this.state$.subscribe((state: IFlow) => {
      if (state.chooseProcedure) {
        this.isQuery = state.chooseProcedure?.typeProcedure === EState.QUERY;

        if (this.isQuery) {
          this.form.controls.isAffiliate.setValidators([]);
          this.form.controls.isAffiliate.updateValueAndValidity();
          this.form.controls.code.setValidators([AppValidators.required]);
          this.form.controls.code.updateValueAndValidity();
        }
      } else {
        this.isQuery = false;
      }

      if (state.affiliate) {
        const {
          firstName = '',
          secondName = '',
          fatherLastname = '',
          motherLastname = '',
        } = state.affiliate;
        const fullName = `${fatherLastname} ${motherLastname} ${firstName} ${secondName} `;
        this.form.controls.fullName.setValue(fullName);
      } else if (state.procedure) {
        const {
          firstName = '',
          secondName = '',
          fatherLastname = '',
          motherLastname = '',
        } = state.procedure.affiliate;
        const fullName = `${fatherLastname} ${motherLastname} ${firstName} ${secondName}`;
        this.form.controls.fullName.setValue(fullName);
      } else {
        this.form.controls.fullName.setValue('');
      }
    });
    this.form.controls.fullName.setValue('');
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
  private setMaxDateBirthday(): void {
    const currentDate = new Date();

    const [maxDay, maxMounth, maxYear] = [
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear() - 18,
    ];
    this.maxDateBirthday = new Date(maxYear, maxMounth, maxDay);
  }
  private setMaxLengthDni(value: string) {
    if (value === '1') {
      this.maxLengthtDocument = '8';
    } else {
      this.maxLengthtDocument = '20';
    }
  }

  private setRangeDate() {
    const range = 130;
    const start = 18;
    const currentDate = moment().subtract(start, 'y').format('YYYY-MM-DD');
    const currentDateArr = currentDate.split('-');
    const currentYear = parseInt(currentDateArr[0], 10);
    const currentMonth = parseInt(currentDateArr[1], 10) - 1;
    const currentDay = parseInt(currentDateArr[2], 10);

    this.minDate = new Date(currentYear - range, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
  }

  private resetInfo() {
    if (this.form.controls.documentNumber.value) {
      this.form.controls.documentNumber.reset();

      if (this.form.controls.documentType.value !== 'DNI') {
        return;
      }
    }
  }
}
