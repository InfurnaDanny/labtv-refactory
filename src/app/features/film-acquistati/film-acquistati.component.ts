import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmAquiredService } from '../../shared/services/film-aquired.service';
import { IFilm } from '../../model/film';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-film-acquistati',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Tutti i film acquistati:</h1>  
      <ul>
          @for(film of filmAquiredArray(); track film.idFilm){
              <li>
                  <div>{{film.idFilm}}</div>
                  <div>{{film.title}}</div>
                  <div>
                    <button (click)="refundFilm(film.idFilm, $event)">
                      RESTITUISCI
                    </button>
                    <i class="fa-solid fa-xmark"></i>
                  </div>
              </li>
          }
      </ul>
    </section>
  `,
  styleUrls: ['./film-acquistati.component.scss']
})
export class FilmAcquistatiComponent implements OnInit {
  
  filmAquiredService = inject(FilmAquiredService);
  authService = inject(AuthService);

  filmAquiredArray = signal<IFilm[]>([]);
    
  ngOnInit() {
    this.authService.userID.subscribe(id => {
      if(id) this.filmAquiredService
              .getFilmAquired(id)
              .subscribe(data => this.filmAquiredArray.set(data));
    })
  }

  refundFilm(filmId:string, e:Event){ 
    e.preventDefault();
    
    let confirmDelete = confirm('Sei sicuro di voler restituire il film?');

    if(confirmDelete){ 
      this.filmAquiredService.deleteFilm(+filmId);
      
      this.filmAquiredArray.set(
        this.filmAquiredArray().filter(el => {return el.idFilm != filmId})
      ); 
    }
  }
}
