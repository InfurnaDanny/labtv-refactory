import { Component, OnInit } from '@angular/core';
import {IMovieIMDB} from '../../model/movieIMDB';
import {MovieResearch} from '../film/service/movie-research.service';
import {MovieService} from '../film/service/movie.service';
import {CarouselComponent} from './carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private movieService:MovieService, private searchInput: MovieResearch) { }
  
  movieArray: IMovieIMDB[] = []; // creo un array che conterrà tutti i film dell'API
  movie: IMovieIMDB[] = []; // contenitore che verrà iterato nella pagina
  movieSearched: IMovieIMDB[] = [];

  actNum:number = 2; // questo sarà il moltiplicatore dei film da pushare nell'Array Movie
  searchValue: string | undefined;
  
  ngOnInit(): void {
    /* this.getMovie(); */ 

    this.searchInput.searchInput.subscribe((value: any) =>{
      if(value !== ''){
        let newArray: IMovieIMDB[] = this.movieArray.filter(
          el => {return el.fullTitle.toLowerCase().includes(value.toLocaleLowerCase())});
        
        this.movie = [...newArray];
      } else{
        this.movie = [...this.movieArray.slice(0,75)]
        console.log(this.movieArray);
        
      };
       
    })
  }

  /* getMovie(){ // metodo che richiama l'Api Imdb Most Popular Movie
    this.movieService.getMovie().subscribe( //chiamo l'api che restituisce la lista film
      (data)=>{        
        console.log(data);
        
        for(let i = 0; i < data.length; i++){ 
            // Rimpiazzo un pezzo di stringa che serve a restituirmi l'immagine alla massima risoluzione
            if(data[i].image.length > 115){
              data[i].image = data[i].image.slice(0,117)
            }
          }
        
        this.movieArray = data; // Assegno i dati ricevuti all'array "movieArray"

        for(let i = 0; this.movie.length < 25; i++){ // inietto nel movieArray i primi 25 item
          this.movie.push(this.movieArray[i])
        }         
      })
  }   */

  getMovieOnScroll(){
    /* se i film nell'array iterato sono meno del numero dei film totali dell'API
       allora ne aggiungo 25 a quelli già presenti e aumento il moltiplicatore */
    if(this.actNum * 25 <= this.movieArray.length){
      for(let i = this.movie.length; this.movie.length < this.actNum * 25; i++){
        this.movie.push(this.movieArray[i])
      }
      
      this.actNum++
    }
  }
}
