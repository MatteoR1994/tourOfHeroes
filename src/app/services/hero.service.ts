import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from '../model/hero';
//import { HEROES } from '../model/mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly API_URL = 'https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    // return heroes;
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.API_URL).pipe(
      tap(_=> this.messageService.add('fetched heroes')),
      catchError((error) => {
        console.log(error)
        return of([]);
      })
    );
    // return this.http.get<Hero[]>(this.API_URL + this.HEROES_GET);
  }

  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
    return this.http.get<Hero>(this.API_URL + '/' + id);
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.API_URL + '/' + hero.id, hero, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`updated hero id=${hero.id}`))
    );
  }

  /** POST: add a new hero on the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.API_URL + '/', hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.messageService.add(`added hero w/ id=${newHero.id}`))
    );
  }

  /** DELETE: delete a hero on the server */
  deleteHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(this.API_URL + '/' + id, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`deleted hero id=${id}`))
    );
  }

  /* GET heroes whose name contains search name */
  searchHeroes(name: string): Observable<Hero[]> {
    name = name.trim();
    return this.http.get<Hero[]>(this.API_URL + '/?name=' + name).pipe(
      tap(result => result.length ?
        this.messageService.add(`found heroes matching "${name}"`) :
        this.messageService.add(`no heroes matching "${name}"`)),
      // catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}
