import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  a: number =0;
  miFormulario: FormGroup = this.formBuilder.group({
    nombre     : ['', [Validators.required, Validators.minLength(3)] ],
    favoritos  : this.formBuilder.array( [
      ['ratita', Validators.required],
      ['palito queca', Validators.required]
    ], Validators.required ),
  })

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: '',
      juego: [
        {id:1,nombre:'ratita peluchito en su palito'},
        {id:1,nombre:'palito con tira de pompón'}
      ],
    })
  }

  campoEsValido(campo: string): boolean {
    return this.miFormulario.controls[campo].errors! &&
            this.miFormulario.controls[campo].touched
  }

  guardar() {
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value)
    

  }

}
