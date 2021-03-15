import { Injectable } from "@angular/core";
import { Personaje } from './../interfaces/dbz.interface';

@Injectable()
export class DbzService {

    // un servicio es el lugar apropiado para tener la data del proyecto
    // y también el único lugar en que se debe poder manipularla

    // estandar es que si es prop  privada lleve  _ 
    private _personajes: Personaje[] = [
        {
          nombre: 'Goku',
          poder: 15000,
        },
        {
          nombre: 'Vegeta',
          poder: 8500,
        },
        {
          nombre: 'Krillin',
          poder: 5000,
        }
      ]
    
      get personajes(): Personaje[] {
          return [...this._personajes];
      }
    
    // se puede inyectar un servicio dentro de otro servicio
    // pero evitando las dependencias ciclicas
    constructor() {
        // console.log("Servicio inicializado");
    }

    agregarPersonaje( personaje: Personaje ){
        this._personajes.push(personaje);
    }

}