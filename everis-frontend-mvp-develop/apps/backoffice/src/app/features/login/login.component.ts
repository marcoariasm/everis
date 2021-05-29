import { Component, OnInit } from '@angular/core';
import { LoginPresenter } from './login.presenter';
import { FormControl, FormGroup } from '@angular/forms';
import { AppValidators } from '@everis-afp-prima/data';

@Component({
  selector: 'everis-afp-prima-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    LoginPresenter
  ],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    public presenter: LoginPresenter
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [AppValidators.required, AppValidators.minLength(5)]),
      password: new FormControl(null, [AppValidators.required, AppValidators.minLength(6)])
    });
  }
}
