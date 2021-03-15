import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private _historial: string[] = [];

  constructor() { }

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query: string) {
    return this._historial.unshift(query);

    // console.log(this._historial);
    
  }

}
