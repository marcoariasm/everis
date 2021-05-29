import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryComponent } from './views/query/query.component';
import { RequestComponent } from './views/request/request.component';
import { MaintenanceComponent } from './views/maintenance/maintenance.component';
import { AuthGuard } from './commons/guards/auth.guard';
import { MaintenanceGuard } from './commons/guards/maintenance.guard';
import { BienvenidoComponent } from './views/bienvenido/bienvenido.component';
import { InformacionComponent } from './views/informacion/informacion.component';
import { InformacionApvComponent } from './views/informacion-apv/informacion-apv.component';
import { InformacionNoApvComponent } from './views/informacion-no-apv/informacion-no-apv.component';
import { VerificacionIdentidadComponent } from './views/verificacion-identidad/verificacion-identidad.component';
import { ResidenteAporteStepComponent } from './views/residente-aporte-step/residente-aporte-step.component';
import { RegistroExitosoComponent } from './views/registro-exitoso/registro-exitoso.component';
import { QuestionsComponent } from './views/questions/questions.component';
import { SeguimientoComponent } from './views/seguimiento/seguimiento.component';
import { ResultadoSeguimientoComponent } from './views/resultado-seguimiento/resultado-seguimiento.component';
import {MaintenanceTracingGuard} from '@aafp/commons/guards/maintenance-tracing.guard';



const routes: Routes = [
  {
    path: '', redirectTo: '/informacion', pathMatch: 'full'
  },
  {
    path: 'bienvenido', component: BienvenidoComponent
  },
  {
    path: 'informacion', component: InformacionComponent,
    canActivate: [MaintenanceGuard]
  },
  {
    path: 'preguntas', component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'libre-disponibilidad', component: InformacionApvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'libre-disponibilidad-aporte', component: InformacionNoApvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verificacion-identidad', component: VerificacionIdentidadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'residente-aporte', component: ResidenteAporteStepComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registro-exitoso', component: RegistroExitosoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consulta', component: QueryComponent,
    canActivate: [MaintenanceGuard]
  },
  {
    path: 'seguimiento', component: SeguimientoComponent,
    canActivate: [MaintenanceTracingGuard]
  },
  {
    path: 'resultado-seguimiento', component: ResultadoSeguimientoComponent,
    canActivate: [MaintenanceTracingGuard]
  },
  {
    path: 'solicitud', component: RequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mantenimiento', component: MaintenanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
