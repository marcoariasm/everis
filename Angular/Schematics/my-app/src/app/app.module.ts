import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import { MiCompoComponent } from './components/mi-compo/mi-compo.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNewComponentComponent,
    MiCompoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
