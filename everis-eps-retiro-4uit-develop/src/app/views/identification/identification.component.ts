import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ModalRejectModel, TypeAccesCode } from '@aafp/commons/models/modal-reject.model';
import { RequestState } from '@aafp/commons/state/request.state';
import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { LoaderState } from '@aafp/commons/state/loader.state';
import { IQuestions, IAffiliate, IRetry } from '@aafp/commons/interfaces';
import { IdentificationPresenter } from './identification.presenter';
import { I18n } from '@aafp/commons/services';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
  providers: [IdentificationPresenter, I18n],
})
export class IdentificationComponent implements OnInit, OnDestroy {
  request$ = this.requestState.request;
  subscription = new Subscription();
  subscriptionTimer = new Subscription();
  minutes = '00';
  seconds = '00';
  questions = [];
  affiliate: IAffiliate = {};
  lang: any;
  ready: boolean;
  answers = { operationId: '', questions: [] };
  countRetry: number;
  hasIdentification: boolean;

  constructor(
    public presenter: IdentificationPresenter,
    private requestState: RequestState,
    private router: Router,
    private loaderState: LoaderState,
    private modal: ModalManager,
    private i18n: I18n
  ) {
    this.lang = this.i18n.getLang('views.identification', 'commons.buttons', 'commons.affiliate');
  }

  ngOnInit(): void {
    this.countRetry = 0;

    this.request$.subscribe((values: IAffiliate) => {
      this.affiliate = values;
    });

    this.requestQuestions();

    this.subscription.add(this.presenter.retry.subscribe((res: IRetry) => {
      if (res.again) {
        this.answers = { operationId: '', questions: [] };
        this.ready = false;
        this.countRetry = res.count;
        // timer
        this.subscriptionTimer.unsubscribe();
        this.subscriptionTimer.closed = false;
        this.minutes = '00';
        this.seconds = '00';
        this.subscriptionTimer.add(this.presenter.signatureExpire().subscribe((re: any) => {
          this.timer(re);
        }));
        // request again
        this.requestQuestions();
      }
    }));

    this.subscriptionTimer.add(this.presenter.signatureExpire().subscribe((res: any) => {
      this.timer(res);
    }));
  }

  timer(res: any) {
    if (res.value <= 1) {
      this.presenter.openModalExpire();
    }

    this.minutes = res.minutes;
    this.seconds = res.seconds;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionTimer.unsubscribe();
  }

  back(): void {
    this.router.navigate(['/consulta']);
  }

  private requestQuestions() {
    this.presenter.requestQuestions().then(
      (response: IQuestions) => this.successRequestQuestions(response),
      error => this.failRequestQuestions(error)
    );
  }

  successRequestQuestions(response: IQuestions) {
    const questions = response ? response.questions || [] : [];

    this.hasIdentification = true;
    this.loaderState.close();
    this.questions = questions;
    this.answers.operationId = response.operationId;
    this.questions.forEach((item: any) => {
      this.answers.questions.push(Object.assign({
        category: item.category,
        answered: false,
        id: item.id,
        optionId: ''
      }));
    });

    return true;
  }

  selectQuestion(value: string, i: number, description: string) {
    if (this.answers.questions[i]) {
      this.answers.questions[i].answered = true;
      this.answers.questions[i].optionId = value;
    }

    if (this.answers.questions.every(x => x.answered)) {
      this.ready = true;
    } else {
      this.ready = false;
    }
  }

  private failRequestQuestions(httpError) {
    const errorCode: TypeAccesCode = 'GENERIC_ERROR';
    const data: ModalRejectModel | object = new ModalRejectModel(errorCode);

    this.hasIdentification = true;
    this.ready = false;
    this.loaderState.close();
    this.modal.show('reject', { data });
  }
}
