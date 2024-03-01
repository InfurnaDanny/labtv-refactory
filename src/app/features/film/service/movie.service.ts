import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IFilmDetail } from '../../../model/film-detail';
import { IMovieIMDB } from '../../../model/movieIMDB';


const MOVIE_API = 'https://imdb-top-100-movies.p.rapidapi.com/';
const MOVIE_DETAILS_API = 'https://mdblist.p.rapidapi.com/?i=';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  http = inject(HttpClient);

  options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '24d353495dmshc9e06ea42371d15p1c7c31jsnf235c87675bc',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };

  getMovies(){   
    return this.http.get<IMovieIMDB[]>(MOVIE_API, this.options);
  }

  getMovieDetail(idFilm:string){
    return this.http.get<IFilmDetail>(`${MOVIE_DETAILS_API}${idFilm}`, this.options);
  }
}
