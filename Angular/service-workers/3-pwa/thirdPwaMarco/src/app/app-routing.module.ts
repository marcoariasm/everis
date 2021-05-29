import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AppComponent } from './app.component';
import { PruebaComponent } from './prueba/prueba.component';
import { RedireccionComponent } from './redireccion/redireccion.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'sw', component: RedireccionComponent },
  { path: 'bcp-login/:uuid/:code', component: PruebaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // uuid: string = uuidv4();
 }
