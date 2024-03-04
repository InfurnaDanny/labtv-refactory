import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../features/film/service/movie.service';
import {UserService} from '../../shared/services/user.service';


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
  router = inject(Router)

  username = signal<string | null>(null);
  isUserLogged = signal(false);

  ngOnInit() {
    this.isUserAuthenticated();

    this.userService.userName.subscribe(username => username ? this.username.set(username) : 'Non Autenticato');
    this.userService.isLoggegIn.subscribe(isLogged => this.isUserLogged.set(isLogged));
  }

  isUserAuthenticated(){    
    if(
      localStorage.getItem('idUser') && 
      localStorage.getItem('token') && 
      localStorage.getItem('username')
    ){      
      this.userService.userID.next(localStorage.getItem('idUser'));
      this.userService.userToken.next(localStorage.getItem('token'));
      this.userService.userName.next(localStorage.getItem('username'));
    }
  }

  searchThis(input: HTMLInputElement){    
    this.movieSearch.searchInput.set(input.value);
  }
  
  logout(){
    this.userService.userID.next(null);
    this.userService.isLoggegIn.next(false);
    this.userService.userName.next(null);
    this.userService.userToken.next(null);

    localStorage.clear();
    
    this.router.navigate(['/login']);
  }
}
