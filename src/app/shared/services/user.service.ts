import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../model/login.model';
import { AlertService } from '../components/alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  alertService = inject(AlertService);
  router = inject(Router);

  isLoggegIn = signal(false);
  userID = signal<string | null>(null);
  userName = signal<string | null>(null);
  userToken = signal<string | null>(null);

  saveUserData(res: Login) {
    this.userID.set(res.user.id);
    this.isLoggegIn.set(true);
    this.userName.set(res.user.username);
    this.userToken.set(res.accessToken);

    localStorage.setItem('token', res.accessToken);
    localStorage.setItem('idUser', res.user.id);
    localStorage.setItem('username', res.user.username);
  }

  isUserAuthenticated(){    
    if(
      localStorage.getItem('idUser') && 
      localStorage.getItem('token') && 
      localStorage.getItem('username')
    ){      
      this.userID.set(localStorage.getItem('idUser'));
      this.userToken.set(localStorage.getItem('token'));
      this.userName.set(localStorage.getItem('username'));
      this.isLoggegIn.set(true);
    }
  }

  logout(){
    this.userID.set(null);
    this.isLoggegIn.set(false);
    this.userName.set(null);
    this.userToken.set(null);

    localStorage.clear();
    
    this.router.navigate(['/login']);
  }
}
