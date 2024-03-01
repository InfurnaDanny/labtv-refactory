import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { IFilm } from '../../model/film';
import {filter, map, switchMap} from 'rxjs';

const FILM_API = 'http://localhost:3000/600/users';
const DELETE_API =  'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class FilmAquiredService {
  http = inject(HttpClient);

  getFilmAquired(idUser: string){
    return this.http.get<IFilm[]>(`${FILM_API}/${idUser}/films-acquistati`)
  }

  addFilm(idMovie:IFilm, idUser: string){
    return this.http.post<IFilm>(`${FILM_API}/${idUser}/films-acquistati`, idMovie)
  }

  deleteFilm(idMovie:string, idUser: string){
    return this.getFilmAquired(idUser).pipe(
      map((films: any[]) => films.find(film => film.idFilm === idMovie)),
      filter(film => film != null),
      switchMap(film => this.http.delete(`${DELETE_API}/films-acquistati/${film.id}`))
    );
  }
}
