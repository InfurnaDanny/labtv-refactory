import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FilmAquiredService } from '../../shared/services/film-aquired.service';
import { AlertService } from '../../shared/components/alert.service';
import { MovieService } from './service/movie.service';

import { IFilm} from '../../model/film';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { IFilmDetail } from '../../model/film-detail';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, DragScrollComponent],
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent {

    movieService = inject(MovieService);
    aquiredService = inject(FilmAquiredService);
    route = inject(ActivatedRoute);
    alertService = inject(AlertService);
    
    filmID = signal(this.route.snapshot.params['idFilm']); 
    myFilm = signal<IFilmDetail | undefined>(undefined);
    tabIsVisible = signal(true);
    aquired = signal(false);
    
  constructor() {    
    this.getMovieDetail(this.filmID());

    this.aquiredService.getFilmAquired(localStorage.getItem('idUser')!).subscribe(data => {
      const condition = data.some(film => film.title === this.myFilm()?.title);
      condition ? this.aquired.set(true) : null;      
      }
    )
  }

  getMovieDetail(filmID:string){
    this.movieService.getMovieDetail(filmID).subscribe(data => this.myFilm.set(data))
  }

  buyMovie(){
      const film:IFilm = { idFilm: this.myFilm()?.imdbid!, title: this.myFilm()?.title! };
      const id = localStorage.getItem('idUser')!;

      this.aquiredService.addFilm(film, id).subscribe(() => {
        this.alertService.showAlert('success', 'Film acquistato correttamente');
        this.aquired.set(true);
      }
      );
  }

  refundFilm(e:Event){ 
    e.preventDefault();
    const id = localStorage.getItem('idUser')!;

    let confirmDelete = confirm('Sei sicuro di voler restituire il film?');
    
    if(confirmDelete){
      this.aquiredService.deleteFilm(this.myFilm()?.imdbid!, id).subscribe(() => 
        this.alertService.showAlert('success', 'Film restituito correttamente'));

      this.aquired.set(false);
    }
  }
}
