import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]>{
    // TODO: send the message _after_ fetching the heroes
    // const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    // return heroes;
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    const heroe = of(HEROES.find(hero => hero.id===id))
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return heroe;
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes'; //URL to web api
}
