import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'Algo',
    precio: 0,
    existencias: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    return this.miFormulario?.form.controls.producto?.invalid && 
         this.miFormulario?.form.controls.producto?.touched;
  }

  precioValido(): boolean {
    return this.miFormulario?.form.controls.precio?.value < 0 &&
        this.miFormulario?.form.controls.precio?.touched;
  }

  guardar() {
    // console.log('submit hecho', miFormulario.value);
    console.log(this.miFormulario);
    
    if (this.miFormulario.controls.precio.value < 0) {
      console.log('No posteado');
      return;
    } 

    console.log('posteo correcto');
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0
    });
    
    
  }

}
