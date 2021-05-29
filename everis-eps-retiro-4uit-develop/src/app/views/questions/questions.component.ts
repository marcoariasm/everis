import {Component, OnInit} from '@angular/core';
import {VerifyQuestionsModel} from '@aafp/commons/models/verify-questions.model';
import {IAnswerOption, IVerifyAnswersRequest} from '@aafp/commons/interfaces/verify-answers.interface';
import {LoaderState} from '@aafp/commons/state/loader.state';
import {FormControl, FormGroup} from '@angular/forms';
import {AppValidators} from '@aafp/commons/validators/validators';
import {Router} from '@angular/router';
import {getDateStringFormatted} from '@aafp/commons/utils/utils';
import {RequestState} from '@aafp/commons/state/request.state';
import {IAffiliate} from '@aafp/commons/interfaces';
import {ApiQuestions} from '@aafp/commons/http/questions.http';
import {ApiAnswers} from '@aafp/commons/http/answers.http';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from '@aafp/commons/models/datepicker.model';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [ApiAnswers, ApiQuestions,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class QuestionsComponent implements OnInit {
  request$ = this.requestState.request;
  affiliate: IAffiliate = {};
  form: FormGroup;
  votingGroup = new FormControl('', [AppValidators.required, AppValidators.maxLength(6), AppValidators.onlyNumber]);
  emissionDate = new FormControl('', [AppValidators.required, AppValidators.maxLength(10)]);
  expiryDate = new FormControl('');
  public questions: VerifyQuestionsModel;

  constructor(
    private apiAnswers: ApiAnswers,
    private router: Router,
    private loaderState: LoaderState,
    private requestState: RequestState,
    private storage: SessionStorage,
  ) {
    this.form = new FormGroup({
      votingGroup: this.votingGroup,
      expiryDate: this.expiryDate,
      emissionDate: this.emissionDate,
    });
  }

  ngOnInit(): void {
    this.loaderState.close();
    this.request$.subscribe((values: IAffiliate) => {
      this.affiliate = values;
    });
  }

  getValueQuestions(form: FormGroup) {
    const list = [] as IAnswerOption[];
    return list;
  }

  validateQuestions(form: FormGroup) {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return false;
    }
    this.callAnswersService(this.buildRequestData(form));
  }

  private buildRequestData(params) {
    const clone = Object.assign({}, params);
    clone.emissionDate = getDateStringFormatted(params.emissionDate);
    clone.expiryDate = params.expiryDate ? getDateStringFormatted(params.expiryDate) : '';
    clone.votingGroup = params.votingGroup;

    const request = {
      documentType: this.affiliate.documentType,
      documentNumber: this.affiliate.documentNumber,
      birthdate: this.affiliate.birthdate,
      answer1: clone.emissionDate,
      answer2: clone.expiryDate,
      answer3: clone.votingGroup
    };

    const {...payload} = request;
    return payload;
  }

  callQuestionService() {
    //Here we must call the QuestionService to get the questionArray in order to bind each question into html
  }

  callAnswersService(request: IVerifyAnswersRequest) {

    this.loaderState.open();
    this.apiAnswers.sendAnswers(request).subscribe(
      data => this.sucessRequest(data),
      error => {

        this.form.reset();
        this.form.markAsTouched();
        this.loaderState.close();
      }
    );
  }

  private sucessRequest(response: any) {

    this.loaderState.close();
    this.requestState.update(response);
    const navigatePath = this.retentionFlag === 1 ? '/libre-disponibilidad-aporte' : '/libre-disponibilidad';
    this.router.navigate([navigatePath]);
  }

  get retentionFlag() {
    return parseInt(this.storage.get('retentionFlag'));
  }

  public getCurrentDate() {
    // const date = moment(new Date()).format('DD/MM/YYYY');
    const date = '24/11/2020';
    return date;
  }
}
