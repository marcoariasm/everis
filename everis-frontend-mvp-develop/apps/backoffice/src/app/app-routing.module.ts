import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ListProceduresComponent } from './features/list-procedures/list-procedures.component';
import { ProcedureComponent } from './features/procedure/procedure.component';
import { AuthGuard } from '@backoffice/commons/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tramites',
    component: ListProceduresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tramite',
    component: ProcedureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
