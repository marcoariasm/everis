import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DesignsystemModule } from '@everis-afp-prima/designsystem';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './features/login/login.component';
import { ListProceduresComponent } from './features/list-procedures/list-procedures.component';
import { FiltersComponent } from './commons/components/filters/filters.component';
import { ProcedureComponent } from './features/procedure/procedure.component';
import { ModalAssignedComponent } from './commons/components/modal-assigned/modal-assigned.component';
import { ModalRejectedComponent } from './commons/components/modal-rejected/modal-rejected.component';
import { ModalUserNotFoundComponent } from './commons/components/modal-usernotfound/modal-usernotfound.component';
import { ModalSessionComponent } from './commons/components/modal-session/modal-session.component';
import { ModalProcedureCodeComponent } from './commons/components/modal-procedure-code/modal-procedure-code.component';
import { AppComponent } from './app.component';
// import { AppErrorHandler } from './commons/error-handler';
import { InterceptorService } from './commons/services/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalReassignedComponent } from './commons/components/modal-reasigned/modal-reassigned.component';
import { CustomValidatorModule } from '@backoffice/commons/directives/ng-validator/ng-custom-validator.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListProceduresComponent,
    ProcedureComponent,
    ModalAssignedComponent,
    ModalRejectedComponent,
    ModalUserNotFoundComponent,
    ModalSessionComponent,
    ModalProcedureCodeComponent,
    ModalReassignedComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DesignsystemModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CustomValidatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
