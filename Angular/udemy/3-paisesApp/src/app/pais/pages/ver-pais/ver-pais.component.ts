import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from './../../services/pais.service';
import { Country } from './../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  // pais puede ser nulo y tratalo asi
  pais!: Country;

  // activated route sirve para suscribirse a cualquier cambio del url
  constructor( 
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
    ) { }

  ngOnInit(): void {

    // this.activatedRoute.params
    //   .subscribe( params => {
    //     console.log(params);
      
    //     this.paisService.getPaisPorAlpha( params.id )
    //     .subscribe( pais => {
    //       console.log(pais);
    //     })
    //   })


    // el codigo de arriba equivale reduciendolo a:

    this.activatedRoute.params
      // switchMap permite  ingresar un observable y regresar otro observable
      .pipe(
        switchMap( (params) => this.paisService.getPaisPorAlpha(params.id )),
        tap( console.log )
      )
      .subscribe( pais => {
        // console.log(this.pais);
        this.pais = pais;
      })


  }

}
