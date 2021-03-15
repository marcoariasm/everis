import { Component, 
  // OnInit 
} from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
  // styleUrls: ['./listado.component.css']
})
export class ListadoComponent  {

  // constructor() { 
  //   console.log('constructor');
    
  // }

  // ngOnInit(): void {
  //   console.log('ngOnInit');
    
  // }
  heroes: string[] = ['Spiderman', 'Ironman', 'Hulk', 'Thor', 'Capitán América'];
  borrados: string[] = [];

  borrarHeroe(): void {
    console.log('borrando...');
    // this.heroes.pop();
    const heroeBorrado = this.heroes.shift() || '';
    this.borrados.push(heroeBorrado);
    console.log(heroeBorrado);
    
  }

}
