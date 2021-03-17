import { 
  Component, Input, 
  // OnInit 
} from '@angular/core';

import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';


@Component({  
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  // styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent 
// implements OnInit 
{

  // constructor() { }

  // ngOnInit(): void {
  // }

  // @Input()    //@Input('personajes')    personajes es el alias del prop si no lo pongo es por defecto
  // personajes: Personaje[] = [];


  get personajes() {
    return this.dbzService.personajes;
  }

  constructor( private dbzService: DbzService) { }

}
