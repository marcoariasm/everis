import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   'nombre'     : new FormControl('RTX 4080ti'),
  //   'precio'     : new FormControl(800),
  //   'existencias': new FormControl(15)
  // })
  miFormulario: FormGroup = this.fb.group({
    nombre     : [ '', [Validators.required, Validators.minLength(3)] ],
    precio     : [ , [Validators.required, Validators.min(0) ]],
    existencias: [ , [Validators.required, Validators.min(0)]]
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
    this.miFormulario.reset({
      nombre: 'RTX 44080ti',
      precio: 1600  //  notese que falta existencias y aun asi el form NO REVENTÓ!!!
    })
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
           && this.miFormulario.controls[campo].touched
  }

  // campoEsCero(campo: string) {
  //   return this.miFormulario.controls[campo].errors!.min.min == 0
  // }

  // campoEsNegativo(campo: string) {
  //   return this.miFormulario.controls[campo].errors!.min.actual < 0
  // }

  guardar() {
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
