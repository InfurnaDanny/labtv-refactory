import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import {AuthService} from '../../auth/auth.service';
import {MovieResearch} from '../../features/film/service/movie-research.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  authService = inject(AuthService);
  movieSearch = inject(MovieResearch);
  router = inject(Router)

  username = signal<string | undefined>(undefined);
  isUserLogged = signal(false);

  ngOnInit() {
    this.authService.userName.subscribe(username => username ? this.username.set(username) : 'Non Autenticato');
    this.authService.isLoggegIn.subscribe(isLogged => this.isUserLogged.set(isLogged));
  }

  searchThis(input: HTMLInputElement){
      this.movieSearch.searchInput.set(input.value)
  }
  
  logout(){
    this.authService.userID.next(undefined);
    this.authService.isLoggegIn.next(false);
    this.authService.userName.next(undefined);
    this.authService.userToken.next(undefined);

    localStorage.clear();
    
    this.router.navigate(['/login']);
  }
}
