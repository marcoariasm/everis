import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BypassComponent } from './bypass/bypass.component';
import { InicioComponent } from './inicio/inicio.component';
import { PruebaComponent } from './prueba/prueba.component';


const routes: Routes = [
  { path:'prueba', component: PruebaComponent },
  { path:'by', component: BypassComponent},
  { path:'bcp-login/:code/:token/:apiGw', component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
