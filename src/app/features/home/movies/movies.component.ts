import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterLink } from '@angular/router';

import { IMovieIMDB } from '../../../model/movieIMDB';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, RouterLink],
  template: `
    <section id="content">
      <article
        class="row"
        infiniteScroll
        [infiniteScrollDistance]=".5"
        [infiniteScrollThrottle]="1000"
        [alwaysCallback]="true"
        (scrolled)="getMovieOnScroll.emit()"
      >
        <h1>I film più popolari</h1>
        @for (film of movies; track $index) {
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
      </article>
    </section>
  `,
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  @Input({ required: true} ) movies: IMovieIMDB[] | undefined;
  @Output() getMovieOnScroll = new EventEmitter;
}
