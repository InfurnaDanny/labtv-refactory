import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmAquiredService } from '../../shared/services/film-aquired.service';
import { IFilm } from '../../model/film';
import { AlertService } from '../../shared/components/alert.service';
import { UserService } from '../../shared/services/user.service';

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
          }@empty {<li>Loading data or No item founded</li>}
      </ul>
    </section>
  `,
  styleUrls: ['./film-acquistati.component.scss']
})
export class FilmAcquistatiComponent {
  
  filmAquiredService = inject(FilmAquiredService);
  userService = inject(UserService);
  alertService = inject(AlertService);

  filmAquiredArray = signal<IFilm[]>([]);
    
  constructor() {
    effect(()=>{
      if(this.userService.userID()){
        this.filmAquiredService.getFilmAquired(this.userService.userID()!).subscribe(data => this.filmAquiredArray.set(data))
      }
    })
  }

  refundFilm(filmId:string, e:Event){ 
    e.preventDefault();
    const id = localStorage.getItem('idUser')!;

    const confirmDelete = confirm('Sei sicuro di voler restituire il film?');

    if(confirmDelete){
      this.filmAquiredService.deleteFilm(filmId, id).subscribe(() => 
          this.alertService.showAlert('success', 'Film restituito correttamente')
      );

      this.filmAquiredArray.set(
        this.filmAquiredArray().filter(el => {return el.idFilm != filmId})
      ); 
    }
  }
}
