import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAffiliates, IValidation, EState } from '@everis-afp-prima/data';
import { HttpValidation } from '../../commons/http/validation.http';
import { RequestState } from '../../commons/state/request.state';
import { LoaderState } from '../../commons/state/loader.state';

@Injectable()
export class ProcedurePresenter {
  state$ = this.requestState;
  subscription = new Subscription();
  procedure;
  affiliate;
  signature: string;
  constructor(
    private requestState: RequestState,
    private httpValidation: HttpValidation,
    private loaderState: LoaderState,
    private router: Router
  ) {
    this.state$.request.subscribe((res) => {
      this.procedure = res.procedure;
      this.affiliate = res.procedure.affiliate;
      this.signature = res.signature;
    });
  }

  verify(values: IAffiliates) {
    const {
      birthdate,
      documentNumber,
      documentType,
      isAffiliate,
      recaptcha,
    } = values;
    const payload = { birthdate, documentNumber, documentType, isAffiliate };

    this.loaderState.open();
    this.httpValidation.query(payload, recaptcha).subscribe(
      (data) => this.sucessRequest(data),
      (error) => this.failRequest(error)
    );
  }

  private sucessRequest(response: IValidation) {
    this.state$.action({ affiliate: response, signature: response.signature });
    this.loaderState.close();

    this.gotTo();
  }

  private failRequest(error) {
    this.loaderState.close();
  }

  gotTo() {
    if (this.state$.hasChooseProcedureString === EState.QUERY) {
      this.router.navigate(['/tramite']);
    } else {
      this.router.navigate(['/registro']);
    }
  }

  setComentRQ(comment: string, file, filename) {
    return {
      body: {
        requestId: this.procedure.id,
        affiliateId: this.affiliate.id,
        documentType: this.affiliate.documentTypeId,
        documentNumber: this.affiliate.documentNumber,
        birthdate: this.affiliate.birthdate,
        comment,
        file,
        fileName: filename,
      },
      headers: {
        'x-prima-signature': this.signature,
      },
    };
  }
}
