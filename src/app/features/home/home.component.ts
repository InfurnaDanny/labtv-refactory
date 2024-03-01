import { ChangeDetectionStrategy, Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { IMovieIMDB } from '../../model/movieIMDB';
import { MovieResearch } from '../film/service/movie-research.service';
import { MovieService } from '../film/service/movie.service';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CarouselComponent, InfiniteScrollModule, RouterLink],
  template: `
    <app-carousel></app-carousel>

    <section id="content">
      <article
        class="row"
        infiniteScroll
        [infiniteScrollDistance]=".5"
        [infiniteScrollThrottle]="1000"
        [alwaysCallback]="true"
        (scrolled)="getMovieOnScroll()"
      >
        <h1>I film più popolari</h1>
        @for (film of movies(); track $index) {
            <div class="films" name="film">
                <img [src]="film.image" [alt]="film.title" />
                <a [routerLink]="['/film', film.imdbid]" class="play">
                  <h3>{{ film.title }}</h3>
                  <span><b>Rating:</b> {{ film.rating }}</span>
                  <span><b>Rank:</b> {{ film.rank }}</span>
                  <span><b>Anno:</b> {{ film.year }}</span>
                </a>
              </div>
        }
        @if(currentlyLoading()){
          <div class="loader"></div> 
        }
      </article>
    </section>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movieService = inject(MovieService);
  movieSearch = inject(MovieResearch);
  
  movieArray = signal<IMovieIMDB[]>([]); // array che conterrà tutti i film dell'API
  movies = signal<IMovieIMDB[]>([]); // contenitore che verrà iterato nella pagina

  actNum = signal(1); // questo sarà il moltiplicatore dei film da pushare nell'Array Movie
  currentlyLoading = signal(false);

  constructor(){
    effect(()=>{ // filtro i film in base alla ricerca
      if(this.movieSearch.searchInput() !== ''){ 
        let newArray: IMovieIMDB[] = this.movieArray().filter(el => {
            return el.title.toLowerCase().includes(this.movieSearch.searchInput().toLocaleLowerCase())
        });
        
        this.movies.set([...newArray]);
      } else{ this.movies.set([...this.movieArray().slice(0,25)]) };
    }, { allowSignalWrites: true })
  }
  
  ngOnInit() {
    this.getMovie(); 
  }

  getMovie(){
    this.movieService.getMovies().subscribe(data => {   
        this.movieArray.set(data); // Assegno i dati ricevuti all'array "movieArray"
        this.movies.set(this.movieArray().slice(0,25));   
    })
  }

  getMovieOnScroll(){
    this.currentlyLoading.set(true);

    if(this.actNum() * 25 >= this.movieArray.length){      
      this.movies.set(this.movieArray().slice(0, this.actNum() * 25));
      this.currentlyLoading.set(false);
    }
    this.actNum.update(n => n = n+1);
  }
}
