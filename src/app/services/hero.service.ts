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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    // return heroes;
    return this.http.get<Hero[]>('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes');
  }

  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
    return this.http.get<Hero>('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/' + id);
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/' + hero.id, hero, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`updated hero id=${hero.id}`))
    );
  }

  /** POST: add a new hero on the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/', hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.messageService.add(`added hero w/ id=${newHero.id}`))
    );
  }

  /** DELETE: delete a hero on the server */
  deleteHero(id: string): Observable<Hero> {
    const url = `https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/${id}`;
  
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`deleted hero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/?name=${term}`).pipe(
      tap(x => x.length ?
        this.messageService.add(`found heroes matching "${term}"`) :
        this.messageService.add(`no heroes matching "${term}"`)),
      // catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}
