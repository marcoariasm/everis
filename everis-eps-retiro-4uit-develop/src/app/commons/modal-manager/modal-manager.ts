import { Injectable } from '@angular/core';
import { InitialBannerComponent } from '../components/initial-banner/initial-banner.component';
import { BannerRejectedComponent } from '../components/banner-rejected/banner-rejected.component';
import { BannerRejectedLinkComponent } from '../components/banner-rejected-link/banner-rejected-link.component';
import { BannerConfirmComponent } from '../components/banner-confirm/banner-confirm.component';
import { BannerConfirm25Component } from '../components/banner-confirm-25/banner-confirm-25.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { BannerRequestComponent } from '../components/banner-request/banner-request.component';
import { BannerContentInfoComponent } from './../components/banner-content-info/banner-content-info.component';
import { OutOfServiceBannerComponent } from './../components/out-of-service-banner/out-of-service-banner.component';
import { BannerConfirmClaveAfpComponent } from '../components/banner-confirm-clave-afp/banner-confirm-clave-afp.component';
import { BannerConfirmLibreDisponibilidadComponent } from '../components/banner-confirm-libre-disponibilidad/banner-confirm-libre-disponibilidad.component';
import { BannerConfirmBlockedComponent } from '../components/banner-confirm-blocked/banner-confirm-blocked.component';
import { BannerOsiptelComponent } from '../components/banner-osiptel/banner-osiptel.component';
import { AlertComponent } from '@aafp/commons/components/alert/alert.component';
import { BannerNoAccessCalendar } from '../components/banner-no-access-calendar/banner-no-access-calendar.component';
import {BannerAmountConfirmComponent} from '@aafp/commons/components/banner-amount-confirm/banner-amount-confirm.component';

export type TypeBanner = 'confirm' | 'confirm25' | 'confirmBlocked' | 'reject' | 'rejectLink' | 'initial' | 'request' | 'content' | 'outOfService' | 'contentafp' | 'contentLibredis' | 'osiptel' | 'alert' | 'noAccessCalendar' | 'amountConfirm';

@Injectable({
  providedIn: 'root'
})
export class ModalManager {
  private bodyComponents = {
    confirm: BannerConfirmComponent,
    confirm25: BannerConfirm25Component,
    reject: BannerRejectedComponent,
    initial: InitialBannerComponent,
    rejectLink: BannerRejectedLinkComponent,
    request: BannerRequestComponent,
    content: BannerContentInfoComponent,
    contentafp: BannerConfirmClaveAfpComponent,
    outOfService: OutOfServiceBannerComponent,
    contentLibredis : BannerConfirmLibreDisponibilidadComponent,
    confirmBlocked : BannerConfirmBlockedComponent,
    osiptel: BannerOsiptelComponent,
    alert: AlertComponent,
    noAccessCalendar: BannerNoAccessCalendar,
    amountConfirm: BannerAmountConfirmComponent
  };

  private modalConfig: MatDialogConfig = {
    width: '350px',
    data: {
      reset: true,
    },
  };
  constructor(private dialog: MatDialog) { }

  show<T>(type: TypeBanner, data?: MatDialogConfig) {
    if (this.bodyComponents[type] === InitialBannerComponent ||
        this.bodyComponents[type] === BannerContentInfoComponent) {
      this.dialog.open(this.bodyComponents[type], { ...this.modalConfig, ...data });
    } else {
      this.dialog.open(this.bodyComponents[type], { ...this.modalConfig, disableClose: true, ...data });
    }
  }
}
