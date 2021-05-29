import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './organisms/header/header.component';
import { SpinnerOverlayComponent } from './molecules/spinner-overlay/spinner-overlay.component';
import { SpinnerInlineComponent } from './molecules/spinner-inline/spinner-inline.component';
import { UploadComponent } from './molecules/upload/upload.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DetailCardComponent } from './molecules/detail-card/detail-card.component';
import { StatusStepComponent } from './molecules/status-steps/status-steps.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerOverlayComponent,
    SpinnerInlineComponent,
    UploadComponent,
    DetailCardComponent,
    StatusStepComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    HeaderComponent,
    SpinnerOverlayComponent,
    SpinnerInlineComponent,
    UploadComponent,
    MatButtonToggleModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
    DetailCardComponent,
    StatusStepComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesignsystemModule {}
