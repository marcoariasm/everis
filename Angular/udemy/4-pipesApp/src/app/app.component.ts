import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'pipesApp';
  valor : number = 1000;
  obj : any = {
    valor: this.valor,
    title: this.title
  }

  mostrarNombre() {
    console.log(this.title);
    console.log(this.valor);
    console.log(this.obj);    
  }
}
