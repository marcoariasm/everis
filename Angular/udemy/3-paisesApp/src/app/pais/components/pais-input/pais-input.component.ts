import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  debouncer : Subject<string> = new Subject();

  @Input() placeholder: string = '';

  termino: string = '';

  constructor() { }

  // se dispara cuando el componente es creado y ya esta inicializado
  ngOnInit(): void {
    this.debouncer
    // no emitas el subscribe sino hasta que hayan pasado 300 milisegundos
    .pipe( debounceTime(300) )  
    .subscribe( valor => {
      // console.log('debouncer ->', valor);
      this.onDebounce.emit(valor);
    })
  }

  buscar(){
    console.log("buscando");
    this.onEnter.emit( this.termino );
  }

  teclaPresionada(/*e:any*/ ){
    // const valor = e.target.value;
    // console.log(valor);
    // console.log(this.termino);
    
    this.debouncer.next( this.termino);
    
  }

}
