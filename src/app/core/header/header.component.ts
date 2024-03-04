import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MovieService } from '../../features/film/service/movie.service';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  userService = inject(UserService);
  movieSearch = inject(MovieService);

  username = signal<string | null>(null);
  isUserLogged = signal(false);

  ngOnInit() {
    this.userService.isUserAuthenticated();

    this.userService.userName.subscribe(username => username ? this.username.set(username) : 'Non Autenticato');
    this.userService.isLoggegIn.subscribe(isLogged => this.isUserLogged.set(isLogged));
  }

  searchThis(input: HTMLInputElement){    
    this.movieSearch.searchInput.set(input.value);
  }
}
