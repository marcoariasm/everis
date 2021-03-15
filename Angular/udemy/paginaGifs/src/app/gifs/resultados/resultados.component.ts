import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {

  // @ViewChild('txtPrueba') txtPrueba!:ElementRef<HTMLInputElement>
  constructor() { }

  ngOnInit(): void {
  }

  // Prueba() {
  //   const valor = this.txtPrueba.nativeElement.value;
  //   console.log(valor);
  //   this.txtPrueba.nativeElement.value = '';    
  // }

}
