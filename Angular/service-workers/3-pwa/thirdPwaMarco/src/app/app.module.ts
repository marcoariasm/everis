import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestCache } from './cache/request-cache.service';
import { CachingInterceptor } from './cache/caching-interceptor.service';
import { PruebaComponent } from './prueba/prueba.component';
import { RedireccionComponent } from './redireccion/redireccion.component';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    RedireccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
