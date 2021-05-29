import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AppValidators,
  FULLPROCEDURES,
  PROCEDURE_TYPE,
  DOCUMENT_TYPE,
  IFilter,
  AppDateAdapter,
  APP_DATE_FORMATS,
} from '@everis-afp-prima/data';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CommonService } from '@backoffice/commons/services/common.service';
@Component({
  selector: 'everis-afp-prima-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() loader: boolean;
  @Output() search = new EventEmitter<IFilter>();
  form: FormGroup;
  maxLengthtDocument = '8';
  subcription: Subscription = new Subscription();
  documentType = new FormControl('', [AppValidators.required]);
  procedures: any[];
  procedureType: any[];
  documentsType: any[];
  alphaNumeric = 'isAlphaNumeric';

  constructor(private common: CommonService) {}

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.common.getTypeRequest(user.login, user.signature).subscribe((data) => {
      this.procedures = this.getProcedure(data);
    });
    //this.procedures = FULLPROCEDURES.sort(this.orderByname);
    this.procedureType = PROCEDURE_TYPE;
    this.documentsType = DOCUMENT_TYPE;
    this.form = new FormGroup({
      documentType: this.documentType,
      documentNumber: new FormControl('', [
        AppValidators.required,
        AppValidators.maxLengthDNI(this.documentType),
      ]),
      procedureType: new FormControl(null),
      status: new FormControl(null),
      executive: new FormControl(null),
      cuspp: new FormControl(null),
      registerDate: new FormControl(null),
    });
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
  }

  apply(values: IFilter) {
    this.search.emit(values);
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

  clear() {
    const {
      documentType,
      documentNumber,
      procedureType,
      status,
      cuspp,
      executive,
      registerDate,
    } = this.form.controls;
    documentType.setValue(undefined);
    documentNumber.setValue(undefined);
    procedureType.setValue(undefined);
    status.setValue(undefined);
    cuspp.setValue(undefined);
    executive.setValue(undefined);
    registerDate.setValue(undefined);
    this.form.updateValueAndValidity();
  }

  private getProcedure(data) {
    return data.map((element) => {
      return {
        value: element.id,
        name: element.name,
      };
    });
  }
  private setMaxLengthDni(value: string) {
    if (value === '1') {
      this.maxLengthtDocument = '8';
    } else {
      this.maxLengthtDocument = '20';
    }
  }

  private resetInfo() {
    if (this.form.controls.documentNumber.value) {
      this.form.controls.documentNumber.reset();

      if (this.form.controls.documentType.value !== '1') {
        return;
      }
    }
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
