import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';

import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueryComponent } from './views/query/query.component';
import { QuestionsComponent } from './views/questions/questions.component';
import { RequestComponent } from './views/request/request.component';
import { MaintenanceComponent } from './views/maintenance/maintenance.component';
import { BannerConfirmComponent } from './commons/components/banner-confirm/banner-confirm.component';
import { BannerConfirm25Component } from './commons/components/banner-confirm-25/banner-confirm-25.component';
import { InitialBannerComponent } from './commons/components/initial-banner/initial-banner.component';
import { BannerRejectedComponent } from './commons/components/banner-rejected/banner-rejected.component';
import { BannerRejectedLinkComponent } from './commons/components/banner-rejected-link/banner-rejected-link.component';
import { AlertComponent } from './commons/components/alert/alert.component';
import { AffiliateComponent } from './commons/components/affiliate/affiliate.component';
import { AdditionalInfoComponent } from './commons/components/additional-info/additional-info.component';
import { MatSpinnerOverlayComponent } from './mat-spinner-overlay/mat-spinner-overlay.component';
import { BannerRequestComponent } from './commons/components/banner-request/banner-request.component';
import { BannerContentInfoComponent } from './commons/components/banner-content-info/banner-content-info.component';
import { OutOfServiceComponent } from './views/out-of-service/out-of-service.component';
import { OutOfServiceBannerComponent } from './commons/components/out-of-service-banner/out-of-service-banner.component';
import { BienvenidoComponent } from './views/bienvenido/bienvenido.component';
import { InformacionComponent } from './views/informacion/informacion.component';
import { InformacionApvComponent } from './views/informacion-apv/informacion-apv.component';
import { InformacionNoApvComponent } from './views/informacion-no-apv/informacion-no-apv.component';
import { VerificacionIdentidadComponent } from './views/verificacion-identidad/verificacion-identidad.component';
import { BannerConfirmClaveAfpComponent } from './commons/components/banner-confirm-clave-afp/banner-confirm-clave-afp.component';
import { BannerConfirmLibreDisponibilidadComponent } from './commons/components/banner-confirm-libre-disponibilidad/banner-confirm-libre-disponibilidad.component';
import { ResidenteAporteStepComponent } from './views/residente-aporte-step/residente-aporte-step.component';
import { RegistroExitosoComponent } from './views/registro-exitoso/registro-exitoso.component';
import { StepOneComponent } from './commons/components/wizard/step-one/step-one.component';
import { StepTwoComponent } from './commons/components/wizard/step-two/step-two.component';
import { StepThreeComponent } from './commons/components/wizard/step-three/step-three.component';
import { AfpErrorHandler } from './commons/error-handler/error-handler.module';
import { SeguimientoComponent } from './views/seguimiento/seguimiento.component';
import { ResultadoSeguimientoComponent } from './views/resultado-seguimiento/resultado-seguimiento.component';
import { MatFileUploadModule } from 'mat-file-upload';
import { LayoutComponent } from './commons/components/layout/layout.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DatesTableComponent } from './views/informacion/dates/dates-table.component';
import { CustomValidatorDirective } from './commons/validators/custom-validator.directive';
import { BannerConfirmBlockedComponent } from './commons/components/banner-confirm-blocked/banner-confirm-blocked.component';
import { AFPBannerComponent } from './commons/components/afp-banner/afp-banner.component';
import { BannerOsiptelComponent } from './commons/components/banner-osiptel/banner-osiptel.component';
import { StorageModule } from '@ecnf/ng-microkernel/storage';
import { environment } from '../environments/environment.dev';
import { BannerNoAccessCalendar } from './commons/components/banner-no-access-calendar/banner-no-access-calendar.component';
import { BannerAmountConfirmComponent } from './commons/components/banner-amount-confirm/banner-amount-confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    QueryComponent,
    SeguimientoComponent,
    ResultadoSeguimientoComponent,
    QuestionsComponent,
    RequestComponent,
    MaintenanceComponent,
    BannerConfirmComponent,
    BannerConfirmBlockedComponent,
    BannerConfirm25Component,
    InitialBannerComponent,
    BannerRejectedComponent,
    BannerRequestComponent,
    BannerRejectedLinkComponent,
    AlertComponent,
    AffiliateComponent,
    AdditionalInfoComponent,
    BannerContentInfoComponent,
    OutOfServiceComponent,
    OutOfServiceBannerComponent,
    MatSpinnerOverlayComponent,
    BienvenidoComponent,
    InformacionComponent,
    InformacionApvComponent,
    InformacionNoApvComponent,
    VerificacionIdentidadComponent,
    BannerConfirmClaveAfpComponent,
    BannerConfirmLibreDisponibilidadComponent,
    ResidenteAporteStepComponent,
    RegistroExitosoComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    LayoutComponent,
    DatesTableComponent,
    CustomValidatorDirective,
    AFPBannerComponent,
    BannerOsiptelComponent,
    BannerNoAccessCalendar,
    BannerAmountConfirmComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatCardModule,
        MatDividerModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatStepperModule,
        NgxMaskModule.forRoot(),
        AfpErrorHandler,
        MatFileUploadModule,
        MatTooltipModule,
        StorageModule.forRoot({
          secretKey: environment.keystorage,
        })
    ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es',
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
