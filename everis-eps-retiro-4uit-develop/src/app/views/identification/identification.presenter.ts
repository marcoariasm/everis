import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { RequestState } from '@aafp/commons/state/request.state';
import { ApiRequest } from '@aafp/commons/http/request.http';
import { ModalRejectModel, TypeAccesCode } from '@aafp/commons/models/modal-reject.model';
import { ModalManager } from '@aafp/commons/modal-manager/modal-manager';
import { LoaderState } from '@aafp/commons/state/loader.state';
import { environment } from '@aafp/env/environment';
import { IQuestions, IAnswers, IAnswersRequest, IAnswerOption, IRetry, IAffiliate } from '@aafp/commons/interfaces';
import { EState, EFlow } from '@aafp/commons/enums';
import { signatureExpire } from '@aafp/commons/utils';
import { EResponse } from '@aafp/commons/enums';
import { ApiQuestions } from '@aafp/commons/http/questions.http';
import { ApiAnswers } from '@aafp/commons/http/answers.http';

@Injectable()
export class IdentificationPresenter {
  request$ = this.requestState.request;
  private retry$ = new BehaviorSubject<IRetry>({ count: 0, again: '' });
  private countRetry: number;

  constructor(
    private apiQuestions: ApiQuestions,
    private apiAnswers: ApiAnswers,
    private requestState: RequestState,
    private loaderState: LoaderState,
    private modal: ModalManager,
    private router: Router
  ) {
    this.countRetry = 0;
  }

  get retry() {
    return this.retry$.asObservable();
  }

  async requestQuestions() {
    const params = {};
    const request = await this.stateData(params);
    const { signature, ...body } = request;

    this.loaderState.open();

    return this.apiQuestions.requestQuestions(body, signature)
      .pipe(map((data: IQuestions) => this.prepareDateQuestionsResponse(data)))
      .toPromise();
  }

  private async prepareDateQuestionsResponse(data: IQuestions) {
    this.requestState.action(data, EState.QUESTIONS);

    return data;
  }

  private async stateData(param) {
    let request = {};
    this.request$.subscribe(data => request = data);

    return await { ...request, ...param };
  }

  signatureExpire(): Observable<any> {
    const timeInterval = environment.config.time.identification;

    return signatureExpire(timeInterval);
  }

  openModalExpire() {
    const data = new ModalRejectModel('REQUEST_EXPIRY', '', [], true);
    this.modal.show('reject', { data });
  }

  async continueRequest(answers: IAnswersRequest, affiliate: IAffiliate) {
    const { signature, flow, birthdate } = affiliate;
    const questions = answers.questions.map((q: IAnswerOption) => {

      return {
        category: q.category,
        optionId: q.optionId,
        id: q.id
      };
    });
    const body: IAnswersRequest = {
      operationId: answers.operationId,
      birthdate,
      questions
    };

    // this.loaderState.open();
    // this.apiAnswers.sendAnswers(body, signature)
    //   .pipe(
    //     map((response: IAnswers) => this.prepareAnswersResponse(response))
    //   )
    //   .subscribe(
    //     (response: IAnswers) => this.successRequestAnswers(response, flow),
    //     error => this.failRequestAnswers(error)
    //   );
  }

  private prepareAnswersResponse(response: IAnswers) {
    this.requestState.action(response, EState.ANSWERS);

    return response;
  }

  successRequestAnswers(response: IAnswers, flow: string) {
    this.loaderState.close();

    if (response.flag === EResponse.APROBADA) {
      this.requestAmount(response, flow);
    } else if (response.flag === EResponse.DESAPROBADA) {
      const errorCode: TypeAccesCode = 'ERROR_IDENTIFICATION';
      const data: ModalRejectModel | object = new ModalRejectModel(
        errorCode, undefined, [], false, false,
        'Volver a intentar', () => {
          this.retryAgain();
        }
      );

      this.modal.show('reject', { data });
    } else {
      this.failRequestAnswers({});
    }
  }

  retryAgain() {
    this.retry$.next({ count: ++this.countRetry, again: `${Date.now()}` });
  }

  private failRequestAnswers(httpError) {
    this.loaderState.close();
    const errorCode: TypeAccesCode = 'GENERIC_ERROR';
    const data: ModalRejectModel | object = new ModalRejectModel(errorCode);

    this.modal.show('reject', { data });
  }

  async requestAmount(response: IAnswers, flow: string) {
    this.loaderState.close();

    if (flow === EFlow.FLOW2k) {
      this.router.navigate(['/solicitud']);
    } else if (flow === EFlow.FLOW25PERCENT) {
      if (response.amountAvailable) {
        this.requestState.action(response.amountAvailable, EState.AMOUNT);
        const amountUIT = environment.config.amountUIT;

        if (parseFloat(response.amountAvailable) <= amountUIT) {
          this.router.navigate(['/retiro25']);
        } else if (parseFloat(response.amountAvailable) > amountUIT) {
          this.router.navigate(['/monto-a-retirar']);
        } else {
          this.failRequestAmount({});
        }
      } else {
        this.failRequestAmount({});
      }
    } else {
      this.failRequestAmount({});
    }
  }

  private failRequestAmount(httpError) {
    this.loaderState.close();
    const errorCode: TypeAccesCode = 'GENERIC_ERROR';
    const data: ModalRejectModel | object = new ModalRejectModel(errorCode);
    this.modal.show('reject', { data });
  }
}
