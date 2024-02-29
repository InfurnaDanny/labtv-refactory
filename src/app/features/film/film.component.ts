import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent {
}
