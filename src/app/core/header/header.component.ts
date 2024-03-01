import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../features/film/service/movie.service';


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
  movieSearch = inject(MovieService);
  router = inject(Router)

  username = signal<string | null>(null);
  isUserLogged = signal(false);

  ngOnInit() {
    this.isUserAuthenticated();

    this.authService.userName.subscribe(username => username ? this.username.set(username) : 'Non Autenticato');
    this.authService.isLoggegIn.subscribe(isLogged => this.isUserLogged.set(isLogged));
  }

  isUserAuthenticated(){    
    if(
      localStorage.getItem('idUser') && 
      localStorage.getItem('token') && 
      localStorage.getItem('username')
    ){      
      this.authService.userID.next(localStorage.getItem('idUser'));
      this.authService.userToken.next(localStorage.getItem('token'));
      this.authService.userName.next(localStorage.getItem('username'));
    }
  }

  searchThis(input: HTMLInputElement){    
    this.movieSearch.searchInput.set(input.value);
  }
  
  logout(){
    this.authService.userID.next(null);
    this.authService.isLoggegIn.next(false);
    this.authService.userName.next(null);
    this.authService.userToken.next(null);

    localStorage.clear();
    
    this.router.navigate(['/login']);
  }
}
