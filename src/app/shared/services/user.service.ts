import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../../model/login.model';
import {AlertService} from '../components/alert.service';
import {Router} from '@angular/router';

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
}
