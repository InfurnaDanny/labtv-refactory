import { Component, OnInit } from '@angular/core';

import { FilmAquiredService } from '../../../shared/services/film-aquired.service';
import {IFilm} from '../../../model/film';

@Component({
  selector: 'app-film-acquistati',
  standalone: true,
  templateUrl: './film-acquistati.component.html',
  styleUrls: ['./film-acquistati.component.scss']
})
export class FilmAcquistatiComponent implements OnInit {
  
  constructor(
    private filmAquired:FilmAquiredService
    ) { }
    
  filmAquiredArray:IFilm[] = [] // array dei film aquistati
    
  ngOnInit(): void {
    /* this.filmAquired.filmAquired().subscribe( // dal database chiamo la lista dei film acquistati dall'utente 
      data => {
        this.filmAquiredArray = data; // creo un array con i film acquistati dall'utente loggato
      }
    ) */
  }

  refundFilm(filmId:string, e:Event){ 
    e.preventDefault();
    
    // chiedo la conferma prima di restituire il film
    let confirmDelete:boolean = confirm('Sei sicuro di voler restituire il film?')

    if(confirmDelete){ 
      // se la restituzione è confermata, elimino il film dal db. passo l'id del film alla chiamata e ritorno l'array filtrato
      this.filmAquired.deleteFilm(+filmId);
      this.filmAquiredArray = this.filmAquiredArray.filter(el => {return el.idFilm != filmId}); 
    } else return
  }
}
