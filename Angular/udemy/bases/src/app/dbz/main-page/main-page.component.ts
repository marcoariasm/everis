import { Component } from '@angular/core';

// interface Personaje {
  //   nombre: string;
  //   poder: number
  // }
  
import { Personaje } from './../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  // styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {


  // personajes: Personaje[] = [];

  nuevo: Personaje = {
    // nombre: 'Trucks',
    // poder: 14000
    nombre: 'Maestro Roshi',
    poder: 1000
  }

  // constructor() { }

  // ngOnInit(): void {
  // }

  // personajes: Personaje[] = [
  //   {
  //     nombre: 'Goku',
  //     poder: 15000,
  //   },
  //   {
  //     nombre: 'Vegeta',
  //     poder: 8500,
  //   },
  //   {
  //     nombre: 'Krillin',
  //     poder: 5000,
  //   }
  // ]

  // agregar() {
    // event.preventDefault();    // sin usar el FormModule
    // console.log("hey...!");


    // console.log("Esta es una prueba");
  //   if (this.nuevo.nombre.trim().length === 0) { return; }

  //   console.log(this.nuevo);
  //   this.personajes.push(this.nuevo);
  //   this.nuevo= {
  //     nombre: '',
  //     poder: 0
  //   }

  // }

  // cambiarNombre(event: any):void {       // ya no se usa porque existe ngModel 2-way data binding
  //   console.log(event.target.value);
  // }

  // getter sirve para traer datos
  // get personajes(): Personaje[]{
  //   return this.dbzService.personajes;
  // }


  // agregarNuevoPersonaje( argumento: Personaje){
  //   // console.log("Main page components");
  //   // console.log("argumento ->", argumento);
  //   this.personajes.push(argumento);    
  // }


  // ESTO es lo que se conoce como una inyección de dependencias
  // desde el punto de vista funcional
  // al mainpage  no le sirve tener datos ni manipularlos
  // porque solo los esta pasando a sus componentes hijos
  // por lo tanto eso debería estar en un servicio
  constructor( ){
    // this.personajes = this.dbzService.personajes;
  }

}
