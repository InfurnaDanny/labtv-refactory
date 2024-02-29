import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { FilmAquiredService } from '../../../shared/services/film-aquired.service';
import { MovieService } from '../service/movie.service';
import {IFilm} from '../../../model/film';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  constructor(
    private movieService:MovieService,
    private aquiredService:FilmAquiredService,
    private route:ActivatedRoute,
    private sanitizer:DomSanitizer,
    ) {}
    
    filmID:string | undefined; // Inizializzo una stringa vuota che mi servirà per la route di secondo livello

    myFilm!: any;
    myTrailer: string = '';
    safeURL: SafeResourceUrl = '';
    tabIsVisible:boolean = true; // SIMILI / DETTAGLI si alternano al true/false

    aquired:boolean = false;
    
  ngOnInit(): void {
    this.filmID = this.route.snapshot.params['nomeFilm']; // Assegno la route di secondo livello al parametro 'nomeFilm'
    
    this.getMovieDetail(this.filmID!) // passo l'id del film al metodo che richiama l'API del film singolo

    //this.getTrailer(this.filmID!) // passo l'id del film al metodo che richiama l'API del trailer 

    /* if(localStorage.getItem('id')){
      this.aquiredService.filmAquired().subscribe(
        data =>{
          for(let i=0; i<data.length;i++){ 
            
            if(data[i].idFilm.includes(this.filmID!)){
              // se nei film acquistati dall'utente, c'è già il film, apparirà il pulsante restituisci
              this.aquired = true
            }
          }
        }
      )
    } */
  }

  getMovieDetail(filmID:string){ // metodo che gestisce l'api per il film singolo
    this.movieService.getMovieDetail(filmID).subscribe(
      data => {        
        this.myFilm = data;
        
    })
  }
  
  /* getTrailer(filmID:string){
    this.movieService.getTrailer(filmID).subscribe(
      data => {
        this.myTrailer = data,
        // causa COVID sanifico l'url di youtube prima di passarlo al metodo che richiama l'API trailer
        this.safeURL =  this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${data.trailer}?autoplay=1&mute=1&controls=0`)
      })
  } */

  newMovieDetail(newID:string){ // riassegno l'ID del singolo film a click di uno dei film "Simili"
    this.filmID = newID;

    this.getMovieDetail(this.filmID);
    //this.getTrailer(this.filmID)
  }

  buyMovie(id:string, title:string){
      const film:IFilm = {
        idFilm: id,
        title: title
      }

      /* if(localStorage.getItem('id')){
        this.aquiredService.addFilm(film).subscribe(() => {
            alert('Film acquistato correttamente')
            window.location.reload();
          }
        );
      } */
  }
}
