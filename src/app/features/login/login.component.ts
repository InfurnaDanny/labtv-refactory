import {CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {LoginUserComponent} from './login-user/login-user.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RegisterComponent, LoginUserComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  @Input() isModaleVisible = true // all'apertura della pagina mostro la modale del login

  isModalVisible(value: boolean){ // dai componenti figli (login/user) dico se la modale è true o false
    this.isModaleVisible = value;
  }
}
