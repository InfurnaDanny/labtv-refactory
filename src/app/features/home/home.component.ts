import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CarouselComponent } from './carousel/carousel.component';
import { MoviesComponent } from './movies/movies.component';

import { IMovieIMDB } from '../../model/movieIMDB';
import { MovieService } from '../film/service/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CarouselComponent, InfiniteScrollModule, RouterLink, MoviesComponent],
  template: `
    <app-carousel></app-carousel>
    <app-movies [movies]="movies()" (getMovieOnScroll)="getMovieOnScroll()"></app-movies>   
  `,
  styles: ``,
})
export class HomeComponent {
  movieService = inject(MovieService);
  
  movieArray = signal<IMovieIMDB[]>([]); // array che conterrà tutti i film dell'API
  movies = signal<IMovieIMDB[]>([]); // contenitore che verrà iterato nella pagina

  actNum = signal(1); // questo sarà il moltiplicatore dei film da pushare nell'Array Movie

  constructor(){
    effect(()=>{ // filtro i film in base alla ricerca
      if(this.movieService.searchInput() !== ''){ 
        let newArray: IMovieIMDB[] = this.movieArray().filter(el => {
            return el.title.toLowerCase().includes(this.movieService.searchInput().toLocaleLowerCase())
        });
        
        this.movies.set([...newArray]);
      } else{ this.movies.set([...this.movieArray().slice(0,25)]) };
    }, { allowSignalWrites: true });

    this.getMovie(); 
  }

  getMovie(){
    this.movieService.getMovies().subscribe(data => {   
        this.movieArray.set(data);
        this.movies.set(this.movieArray().slice(0,25));   
    })
  }

  getMovieOnScroll(){
    if(this.actNum() * 25 >= this.movieArray.length){      
      this.movies.set(this.movieArray().slice(0, this.actNum() * 25));
    }
    this.actNum.update(n => n = n+1);
  }
}
