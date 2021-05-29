import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DesignsystemModule } from '@everis-afp-prima/designsystem';
import {
  RecaptchaModule,
  RecaptchaFormsModule,
  RECAPTCHA_LANGUAGE,
} from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { ChooseProcedureComponent } from './workflows/choose-procedure/choose-procedure.component';
import { ValidationComponent } from './workflows/validation/validation.component';
import { ProcedureComponent } from './workflows/procedure/procedure.component';
import { RegisterComponent } from './workflows/register/register.component';
import { ModalRegisterComponent } from './commons/components/modal-register/modal-register.component';
import { ModalRejectedComponent } from './commons/components/modal-rejected/modal-rejected.component';
import { AppComponent } from './app.component';
// import { AppErrorHandler } from './commons/error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomTooltipModule } from './commons/directives/ng-tippy/ng-custom-tooltip.module';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CustomValidatorModule } from './commons/directives/ng-validator/ng-custom-validator.module';

@NgModule({
  declarations: [
    AppComponent,
    ChooseProcedureComponent,
    ValidationComponent,
    ProcedureComponent,
    RegisterComponent,
    ModalRegisterComponent,
    ModalRejectedComponent,
  ],
  imports: [
    CustomValidatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    DesignsystemModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CustomTooltipModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es',
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
