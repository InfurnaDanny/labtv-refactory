import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Login } from '../../model/login.model';
import { AlertService } from '../components/alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  alertService = inject(AlertService);
  router = inject(Router);

  isLoggegIn = new BehaviorSubject(false);
  userID = new BehaviorSubject<string | null>(null);
  userName = new BehaviorSubject<string | null>(null);
  userToken = new BehaviorSubject<string | null>(null);

  saveUserData(res: Login) {
    this.userID.next(res.user.id);
    this.isLoggegIn.next(true);
    this.userName.next(res.user.username);
    this.userToken.next(res.accessToken);

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
      this.userID.next(localStorage.getItem('idUser'));
      this.userToken.next(localStorage.getItem('token'));
      this.userName.next(localStorage.getItem('username'));
    }
  }

  logout(){
    this.userID.next(null);
    this.isLoggegIn.next(false);
    this.userName.next(null);
    this.userToken.next(null);

    localStorage.clear();
    
    this.router.navigate(['/login']);
  }
}
