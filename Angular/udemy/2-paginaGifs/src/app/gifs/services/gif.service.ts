import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private apiKey : string = 'mTwQ5FtlYGbU6vTkNClIjOVGlsQ2ixOS';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }
  
  constructor(private http: HttpClient) { 
    // this._historial = localStorage.getItem('historial');
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query: string = '') {

    query = query.trim(). toLocaleLowerCase();
    
    if (!this._historial.includes(query)) {

      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    console.log(params);
    
    

    // console.log(this._historial);    
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=mTwQ5FtlYGbU6vTkNClIjOVGlsQ2ixOS&q=cute kid&limit=20')
    // .then( resp => {
    //   resp.json().then(data=> console.log(data)
    //   );
    // })
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=mTwQ5FtlYGbU6vTkNClIjOVGlsQ2ixOS&q=cute kid&limit=20');
    // const data = await resp.json();
    // console.log(data);

    // this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=20`)
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( (resp) => {
        console.log(resp.data);
        // resp.data[0].images.downsized_medium
      this.resultados = resp.data;     
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
    
  }


  

}
