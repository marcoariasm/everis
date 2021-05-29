import { Component, OnInit } from '@angular/core';
import { ChooseProcedurePresenter } from './choose-procedure.presenter';
import { FormControl, FormGroup } from '@angular/forms';
import { AppValidators } from '@everis-afp-prima/data';

@Component({
  selector: 'everis-afp-prima-choose-procedure',
  templateUrl: './choose-procedure.component.html',
  styleUrls: ['./choose-procedure.component.scss'],
  providers: [
    ChooseProcedurePresenter
  ],
})
export class ChooseProcedureComponent implements OnInit {
  form: FormGroup;

  constructor(
    public presenter: ChooseProcedurePresenter
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      typeProcedure: new FormControl(null, [AppValidators.required])
    });
    this.presenter.reset();
  }

}
