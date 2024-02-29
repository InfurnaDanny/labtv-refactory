import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { IFilm } from '../../model/film';

const FILM_API = 'http://localhost:3000/600/users';
const DELETE_FILM_API = 'http://localhost:3000/films-acquistati/';

@Injectable({
  providedIn: 'root'
})
export class FilmAquiredService {
  http = inject(HttpClient);

  getFilmAquired(idUser: string){
    return this.http.get<IFilm[]>(`${FILM_API}/${idUser}/films-acquistati`)
  }

  addFilm(film:IFilm, idUser: string){
    return this.http.post<IFilm>(`${FILM_API}/${idUser}/films-acquistati`, film)
  }

  deleteFilm(idFilm:number){
    return this.http.delete(`${DELETE_FILM_API}/${idFilm}`)
  }
}
