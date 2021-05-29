import { RequestModel } from '@aafp/commons/models';
import { AppValidators } from '@aafp/commons/validators/validators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalManager } from '../../commons/modal-manager/modal-manager';
import { VerifyPresenter } from './verify.presenter';

@Component({
  selector: 'app-verificacion-identidad',
  templateUrl: './verificacion-identidad.component.html',
  styleUrls: ['./verificacion-identidad.component.scss'],
  providers: [VerifyPresenter],
  encapsulation: ViewEncapsulation.None,
})
export class VerificacionIdentidadComponent implements OnInit {
  // HABITAT INTEGRA PRIMA PROFUTURO
  userAFP = ''; // controla los iconos del switch;
  form: FormGroup;
  passwordAFP = new FormControl('', [AppValidators.required]);
  state: any;

  constructor(private modal: ModalManager, public presenter: VerifyPresenter) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      passwordAFP: this.passwordAFP,
    });
    this.presenter.request$
      .subscribe(state => {
        this.state = state;
        this.userAFP = state.afp;
      })
      .unsubscribe();
  }

  showModalContentAfp() {
    this.modal.show('contentafp', { width: '30vw' });
  }

  checkPassword() {
    if (this.form.invalid) {
      this.passwordAFP.markAsTouched();
      return false;
    }
    this.state.passwordAFP = this.form.value.passwordAFP;
    this.presenter.checkPassword(this.state);
    this.form.reset();
    this.passwordAFP.markAsTouched();
  }
}
