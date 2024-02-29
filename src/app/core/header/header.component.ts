import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import {AuthService} from '../../auth/auth.service';
import {MovieResearch} from '../../features/film/service/movie-research.service';


@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  authService = inject(AuthService);
  searchInput = inject(MovieResearch);
  router = inject(Router)

  isUserLogged = signal<boolean>(false) // l'user non è loggato di default
  username = signal<string | undefined>(undefined);
  searchValue= signal<string>('');

  constructor() {    
    if(localStorage.getItem('loggedIn')){
      this.isUserLogged.set(true)
      this.username.set(localStorage.getItem('username')?.toUpperCase());
      this.authService.isLoggegIn.set(true);
    }
  }

  searchThis(){
      this.searchInput.searchInput.next(this.searchValue())
  }

  
  logout(){
    this.authService.isLoggegIn.set(false);
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
