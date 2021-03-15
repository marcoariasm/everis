import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; 

  constructor( private gifsService: GifService) {}

  buscar() {
  
    const valor = this.txtBuscar.nativeElement.value;
  
    // console.log(valor);
    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  
  }

}
