import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { FilmAquiredService } from '../../shared/services/film-aquired.service';
import { MovieService } from './service/movie.service';
import { IFilm} from '../../model/film';
import { CommonModule } from '@angular/common';
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
export class FilmDetailComponent implements OnInit {

    movieService = inject(MovieService);
    aquiredService = inject(FilmAquiredService);
    route = inject(ActivatedRoute);
    
    filmID = signal(this.route.snapshot.params['idFilm']); 
    myFilm = signal<IFilmDetail | undefined>(undefined);
    tabIsVisible = signal(true);
    aquired = signal(false);
    
  ngOnInit(): void {    
    this.getMovieDetail(this.filmID());

    this.aquiredService.getFilmAquired(localStorage.getItem('idUser')!).subscribe(data =>{
      const condition = data.some(film => film.title === this.myFilm()?.title)
      condition ? this.aquired.set(true) : null;      
      }
    )
  }

  getMovieDetail(filmID:string){
    this.movieService.getMovieDetail(filmID).subscribe(data => this.myFilm.set(data))
  }
  
  newMovieDetail(newID:string){ // riassegno l'ID del singolo film a click di uno dei film "Simili"
    this.filmID.set(newID);

    this.getMovieDetail(this.filmID());
  }

  buyMovie(){
      const film:IFilm = { idFilm: this.myFilm()?.imdbid!, title: this.myFilm()?.title! };
      const id = localStorage.getItem('idUser')!;

      this.aquiredService.addFilm(film, id).subscribe(() => {
        alert('Film acquistato correttamente');
        this.aquired.set(true);
      }
      );
  }

  refundFilm(e:Event){ 
    e.preventDefault();
    const id = localStorage.getItem('idUser')!;

    let confirmDelete = confirm('Sei sicuro di voler restituire il film?');
    if(confirmDelete){
      this.aquiredService.deleteFilm(this.myFilm()?.imdbid!, id).subscribe(() => alert('Film restituito correttamente'));
      this.aquired.set(false);
    }
  }
}
