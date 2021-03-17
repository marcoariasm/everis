import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  get resultados() {
    return this.gifsService.resultados;
  }

  // @ViewChild('txtPrueba') txtPrueba!:ElementRef<HTMLInputElement>
  constructor( private gifsService: GifService ) { }

  // Prueba() {
  //   const valor = this.txtPrueba.nativeElement.value;
  //   console.log(valor);
  //   this.txtPrueba.nativeElement.value = '';    
  // }

}
