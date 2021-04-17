import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { Men } from 'primeng/menu';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    MenubarModule,
    MenuItem
  ]
})
export class PrimeNgModule { }
