import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseProcedureComponent } from './workflows/choose-procedure/choose-procedure.component';
import { ValidationComponent } from './workflows/validation/validation.component';
import { ProcedureComponent } from './workflows/procedure/procedure.component';
import { RegisterComponent } from './workflows/register/register.component';
import { AuthGuard } from './commons/guard/auth.guard';
import { ChooseProcedureGuard } from './commons/guard/choose-procedure.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tipo-de-tramite',
  },
  {
    path: 'tipo-de-tramite',
    component: ChooseProcedureComponent
  },
  {
    path: 'validacion',
    component: ValidationComponent,
    canActivate: [ChooseProcedureGuard]
  },
  {
    path: 'tramite',
    component: ProcedureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'tipo-de-tramite',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
