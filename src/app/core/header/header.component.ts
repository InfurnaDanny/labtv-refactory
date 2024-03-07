import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MovieService } from '../../features/film/service/movie.service';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  userService = inject(UserService);
  movieSearch = inject(MovieService);

  ngOnInit() {
    this.userService.isUserAuthenticated();
  }

  searchThis(input: HTMLInputElement){    
    this.movieSearch.searchInput.set(input.value);
  }
}
